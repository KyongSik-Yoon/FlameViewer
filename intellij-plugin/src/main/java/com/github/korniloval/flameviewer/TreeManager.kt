package com.github.korniloval.flameviewer

import com.github.kornilova_l.flamegraph.proto.TreeProtos
import com.github.kornilova_l.flamegraph.proto.TreesPreviewProtos.TreesPreview
import com.github.kornilova_l.flamegraph.proto.TreesProtos
import com.github.korniloval.flameviewer.converters.calltraces.IntellijToCallTracesConverterFactory
import com.github.korniloval.flameviewer.converters.calltree.IntellijToCallTreeConverterFactory
import com.github.korniloval.flameviewer.converters.trees.Filter
import com.github.korniloval.flameviewer.converters.trees.TreeType
import com.github.korniloval.flameviewer.converters.trees.TreesSet
import com.github.korniloval.flameviewer.converters.trees.TreesSetImpl
import com.github.korniloval.flameviewer.converters.trees.hotspots.HotSpot
import com.intellij.openapi.diagnostic.Logger
import java.io.File
import java.util.concurrent.atomic.AtomicLong
import java.util.concurrent.atomic.AtomicReference

object TreeManager {
    private val currentFile = AtomicReference<File?>()
    private val currentTreesSet = AtomicReference<TreesSet?>()
    private val lastUpdate = AtomicLong(0)

    init {
        val watchLastUpdate = Thread {
            while (true) {
                try {
                    Thread.sleep(10000)
                } catch (e: InterruptedException) {
                    e.printStackTrace()
                }
                checkLastUpdate()
            }
        }
        watchLastUpdate.isDaemon = true
        watchLastUpdate.start()
    }

    @Synchronized
    private fun checkLastUpdate() {
        if (System.currentTimeMillis() - lastUpdate.get() >= 30000) {
            currentTreesSet.set(null)
            currentFile.set(null)
            lastUpdate.set(System.currentTimeMillis())
        }
    }

    @Synchronized
    fun getCallTree(logFile: File,
                    filter: Filter?,
                    threadsIds: List<Int>?): TreesProtos.Trees? {
        updateTreesSet(logFile)
        return currentTreesSet.get()?.getCallTree(filter, threadsIds)
    }

    private fun updateTreesSet(logFile: File) {
        val curFile = currentFile.get()
        if (curFile == null || logFile.absolutePath != curFile.absolutePath) {
            currentFile.set(logFile)
            /* try to convert to call tree */
            val callTree = IntellijToCallTreeConverterFactory.create(logFile)?.convert()
            currentTreesSet.set(
                    if (callTree != null) {
                        TreesSetImpl(callTree)
                    } else {
                        /* try to convert to call traces */
                        val callTraces = IntellijToCallTracesConverterFactory.create(logFile)?.convert()
                        if (callTraces == null) {
                            LOG.error("Cannot convert file: ${logFile.absolutePath}")
                            return
                        }
                        TreesSetImpl(callTraces)
                    })
        }
    }

    @Synchronized
    fun getTree(logFile: File, treeType: TreeType, filter: Filter?): TreeProtos.Tree? {
        updateTreesSet(logFile)
        return currentTreesSet.get()?.getTree(treeType, filter)
    }

    @Synchronized
    fun getTree(logFile: File,
                treeType: TreeType,
                className: String,
                methodName: String,
                desc: String,
                filter: Filter?): TreeProtos.Tree? {
        updateTreesSet(logFile)
        return currentTreesSet.get()?.getTree(treeType, className, methodName, desc, filter)

    }

    @Synchronized
    fun getHotSpots(logFile: File): List<HotSpot>? {
        updateTreesSet(logFile)
        return currentTreesSet.get()?.getHotSpots()
    }

    @Synchronized
    fun updateLastTime() {
        lastUpdate.set(System.currentTimeMillis())
    }

    @Synchronized
    fun getCallTreesPreview(logFile: File, filter: Filter?): TreesPreview? {
        updateTreesSet(logFile)
        return currentTreesSet.get()?.getTreesPreview(filter)
    }

    private val LOG = Logger.getInstance(PluginFileManager::class.java)
}

