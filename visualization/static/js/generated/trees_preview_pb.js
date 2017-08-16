/**
 * @fileoverview
 * @enhanceable
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

var com_github_kornilova_l_flamegraph_proto_tree_preview_pb = require('./tree_preview_pb.js');
goog.exportSymbol('proto.com.github.kornilova_l.flamegraph.proto.TreesPreview', null, global);

/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview = function (opt_data) {
    jspb.Message.initialize(this, opt_data, 0, -1, proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.repeatedFields_, null);
};
goog.inherits(proto.com.github.kornilova_l.flamegraph.proto.TreesPreview, jspb.Message);
if (goog.DEBUG && !COMPILED) {
    proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.displayName = 'proto.com.github.kornilova_l.flamegraph.proto.TreesPreview';
}
/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.repeatedFields_ = [1];


if (jspb.Message.GENERATE_TO_OBJECT) {
    /**
     * Creates an object representation of this proto suitable for use in Soy templates.
     * Field names that are reserved in JavaScript and will be renamed to pb_name.
     * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
     * For the list of reserved names please see:
     *     com.google.apps.jspb.JsClassTemplate.JS_RESERVED_WORDS.
     * @param {boolean=} opt_includeInstance Whether to include the JSPB instance
     *     for transitional soy proto support: http://goto/soy-param-migration
     * @return {!Object}
     */
    proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.toObject = function (opt_includeInstance) {
        return proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.toObject(opt_includeInstance, this);
    };


    /**
     * Static version of the {@see toObject} method.
     * @param {boolean|undefined} includeInstance Whether to include the JSPB
     *     instance for transitional soy proto support:
     *     http://goto/soy-param-migration
     * @param {!proto.com.github.kornilova_l.flamegraph.proto.TreesPreview} msg The msg instance to transform.
     * @return {!Object}
     */
    proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.toObject = function (includeInstance, msg) {
        var f, obj = {
            treesPreviewList: jspb.Message.toObjectList(msg.getTreesPreviewList(),
                com_github_kornilova_l_flamegraph_proto_tree_preview_pb.TreePreview.toObject, includeInstance),
            fullduration: jspb.Message.getFieldWithDefault(msg, 2, 0)
        };

        if (includeInstance) {
            obj.$jspbMessageInstance = msg;
        }
        return obj;
    };
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.com.github.kornilova_l.flamegraph.proto.TreesPreview}
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.deserializeBinary = function (bytes) {
    var reader = new jspb.BinaryReader(bytes);
    var msg = new proto.com.github.kornilova_l.flamegraph.proto.TreesPreview;
    return proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.com.github.kornilova_l.flamegraph.proto.TreesPreview} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.com.github.kornilova_l.flamegraph.proto.TreesPreview}
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.deserializeBinaryFromReader = function (msg, reader) {
    while (reader.nextField()) {
        if (reader.isEndGroup()) {
            break;
        }
        var field = reader.getFieldNumber();
        switch (field) {
            case 1:
                var value = new com_github_kornilova_l_flamegraph_proto_tree_preview_pb.TreePreview;
                reader.readMessage(value, com_github_kornilova_l_flamegraph_proto_tree_preview_pb.TreePreview.deserializeBinaryFromReader);
                msg.addTreesPreview(value);
                break;
            case 2:
                var value = /** @type {number} */ (reader.readUint64());
                msg.setFullduration(value);
                break;
            default:
                reader.skipField();
                break;
        }
    }
    return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.serializeBinary = function () {
    var writer = new jspb.BinaryWriter();
    proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.serializeBinaryToWriter(this, writer);
    return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.com.github.kornilova_l.flamegraph.proto.TreesPreview} message
 * @param {!jspb.BinaryWriter} writer
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.serializeBinaryToWriter = function (message, writer) {
    var f = undefined;
    f = message.getTreesPreviewList();
    if (f.length > 0) {
        writer.writeRepeatedMessage(
            1,
            f,
            com_github_kornilova_l_flamegraph_proto_tree_preview_pb.TreePreview.serializeBinaryToWriter
        );
    }
    f = message.getFullduration();
    if (f !== 0) {
        writer.writeUint64(
            2,
            f
        );
    }
};


/**
 * repeated TreePreview trees_preview = 1;
 * If you change this array by adding, removing or replacing elements, or if you
 * replace the array itself, then you must call the setter to update it.
 * @return {!Array.<!proto.com.github.kornilova_l.flamegraph.proto.TreePreview>}
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.getTreesPreviewList = function () {
    return /** @type{!Array.<!proto.com.github.kornilova_l.flamegraph.proto.TreePreview>} */ (
        jspb.Message.getRepeatedWrapperField(this, com_github_kornilova_l_flamegraph_proto_tree_preview_pb.TreePreview, 1));
};


/** @param {!Array.<!proto.com.github.kornilova_l.flamegraph.proto.TreePreview>} value */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.setTreesPreviewList = function (value) {
    jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.com.github.kornilova_l.flamegraph.proto.TreePreview=} opt_value
 * @param {number=} opt_index
 * @return {!proto.com.github.kornilova_l.flamegraph.proto.TreePreview}
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.addTreesPreview = function (opt_value, opt_index) {
    return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.com.github.kornilova_l.flamegraph.proto.TreePreview, opt_index);
};


proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.clearTreesPreviewList = function () {
    this.setTreesPreviewList([]);
};


/**
 * optional uint64 fullDuration = 2;
 * @return {number}
 */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.getFullduration = function () {
    return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/** @param {number} value */
proto.com.github.kornilova_l.flamegraph.proto.TreesPreview.prototype.setFullduration = function (value) {
    jspb.Message.setField(this, 2, value);
};


goog.object.extend(exports, proto.com.github.kornilova_l.flamegraph.proto);
