# FlameViewer
Flamegraph Viewer & Instrumentation Java Profiler Fierix

[![Build Status](https://travis-ci.org/kornilova-l/FlameViewer.svg?branch=master)](https://travis-ci.org/kornilova-l/FlameViewer)

## Download Plugin
https://plugins.jetbrains.com/plugin/10305-flameviewer

## Table of contents
* [Uploading file to FlameViewer](#uploading-file-to-flameviewer)
* [Java performance recording. Quick start](#java-performance-recording-quick-start)
* [Fierix (only IntelliJ IDEA)](#fierix-only-intellij-idea)
* [FlameViewer Features](#flameviewer-features)
    * [Call Traces](#call-traces)
    * [Back Traces](#back-traces)
    * [Zoom](#zoom)    
    * [Filtering](#filtering)    
    * [Search](#search)    
    * [Hot Spots](#hot-spots)    
    * [Call Tree](#call-tree)    
    * [Detailed View of Thread](#detailed-view-of-thread)
* [Contribution](#contribution)
* [Building from sources](#building-from-sources)
 
## Uploading file to FlameViewer
1. Click <strong>Tools | Open FlameViewer...</strong>
2. Upload a file of a supported profiler:
    1. _jfr_ files generated by Flight Recorder
    2. Yourkit _csv_ files. To generate csv file from a snapshot run following script: `java -jar -Dexport.call.tree.cpu -Dexport.csv /lib/yjp.jar -export ~/Snapshots/.snapshot`
    3. Files in flamegraph format
    4. _fierix_ files generated by bundled Fierix profiler (IntelliJ IDEA only)
   
## Java performance recording. Quick start
Use Flight Recorder to profile your program and then open FlameViewer:
1. Make sure that you are using Oracle JDK (not OpenJDK) because Java Mission Control comes only with Oracle JDK. To do it open **File | Project Structure... | Project** then click **Edit** beside **Project SDK**, look at **JDK home path** it should be something like this: `.../jdk1.8.0_162` **not** like this: `.../java-8-openjdk-amd64`. You can download needed version from Oracle website: [JDK 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html), [JDK 9](http://www.oracle.com/technetwork/java/javase/downloads/jdk9-downloads-3848520.html)
2. Run JVM with following VM options: `-XX:+UnlockCommercialFeatures -XX:+FlightRecorder -XX:StartFlightRecording=duration=30s,filename=my_recording.jfr -XX:FlightRecorderOptions=stackdepth=256`
3. Open FlameViewer **Tools | Open FlameViewer...**
4. Upload my_recording.jfr

## Fierix (only IntelliJ IDEA)
Fierix is a bundled instrumentation Java profiler that allows to save parameters of method calls, specify what methods will be instrumented and view a call tree.

1. To specify methods that will be recorded open **Tools | Fierix | Edit Configuration...**  
The configuration below tells profiler to record all methods from my.package.util and my.package.messages packages except methods that start with 'get' or 'set'.  
![](screenshots/profiler_config.png)
2. To run program with profiler select the desired run configuration and choose **Run <name> with profiler**  
![](screenshots/run_with_profiler.png)
3. Also you can configure profiler to save value of method's parameters or it's return value. This should be done if you want to see how parameters influence method's performance. To enable this option check 'Save' checkbox beside type of parameter(s) when editing pattern in configuration.
4. Methods of system classes are not recorded by default. You may include them if you specify full name of a system class in configuration. For example: _java.io.FileOutputStream.\*(\*)_
5. To open results click **Tools | Fierix | Open Results...**

When your program finishes you will see following message:
```
Methods count: 42
```
If `Method count: 0` it means that either configuration is incorrect or all methods took less than 1ms. To profile small quick methods use sampling profiler (see [Quick Start](#quick-start)). 

## FlameViewer Features
Flamegraph Visualizer helps you to analyze performance of Java program. It draws a flamegraph where x-axis represents time and y-axis shows stack depth.

Each rectangle represents a method. If a rectangle is wide it means that your program spent a lot of time executing this method and methods that were called within it.

Basically you are looking for rectangles that have a wide "roof" that does not have any other method calls. It means that your program spent a lot of time executing this method.

### Call Traces
This flamegraph accumulates all stacktraces of profiled program. One rectangle represents one or multiple calls of method.

If you place the cursor on the method's rectangle you will see popup with detailed information about method.

If you click on call-traces/back-traces icon on a popup (blue icons at the top of popup) you will see call-traces/back-traces tree for the method (this tree accumulates information from all calls of the method).
![](screenshots/call-traces.png)

### Back Traces
_Back Traces_ is the bottom-up tree. It shows methods that called the method on the top of flamegraph. This flamegraph may be helpful if you know that some method was called a lot of times and you want to know what is the reason for it.  
![](screenshots/back-traces.png)

### Zoom  
Click on a rectangle to zoom in on it.  
![](screenshots/zoom.png)

### Filtering
If you want to see method that are located in some particular package you can apply filter.  
![](screenshots/filter.png)

### Search
You can find any method, class or package using search.

**Tips**:  
* Character '*' matches any sequence of characters.
* If profiler saved values of parameters, you may include them in search string. For example: _resolve(*, *IdeaPlugin.xml_

![](screenshots/search.png)

### Hot Spots
On Hot Spots page you can see where your program spent the most time.  
![](screenshots/hot-spots.png)

### Call Tree
_This page is only for _.ser_ files_  
On **Call Tree** page you can see activity of all threads. To see what was happening inside particular thread you should click on it's name.   
![threads preview](screenshots/preview.png)

### Detailed View of Thread
_This page is only for _.ser_ files_  
On this page you can see what was happening inside some thread. All method calls have original order. Each rectangle represents only one method call.  
You can see popup with detailed information about method if you place the cursor on the method (also there are parameters and return value if they were saved).  
![](screenshots/thread.png)

## Contribution
If you would like to contribute please ping me on telegram @lkornilova, there are plenty of tasks to do :)

If you have a suggestions or found a bug [open an issue]

## Building from sources
If only want to use plugin then you should simply install ready-to-use [jar](https://plugins.jetbrains.com/plugin/10305-flamegraph-profiler).

To build plugin from sources FlatBuffers compiler version 1.9.0 should be installed on the system.

For information on building and installing the compiler please refer to the [FlatBuffers Documentation] or follow 
the instructions:
 * Ubuntu:
     ```bash
     $ git clone https://github.com/google/flatbuffers.git
     $ cd flatbuffers
     $ git checkout tags/v1.9.0
     $ mkdir target
     $ cd target
     $ cmake .. -G "Unix Makefiles"
     $ make
     $ sudo mv flatc /usr/local/bin/
     ```

Windows:
```
gradlew compilePlugin
gradlew runIdea
```

Linux:
```bash
./gradlew compilePlugin
./gradlew runIdea
```

 [FlatBuffers Documentation]: https://google.github.io/flatbuffers/flatbuffers_guide_building.html
 [open an issue]: https://github.com/kornilova-l/FlameViewer/issues
