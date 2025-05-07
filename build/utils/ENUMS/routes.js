"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRoutes = exports.CommentRoutes = exports.PostRoutes = exports.AuthRoutes = void 0;
var AuthRoutes;
(function (AuthRoutes) {
    AuthRoutes["REGISTER"] = "/register";
    AuthRoutes["LOGIN"] = "/login";
})(AuthRoutes || (exports.AuthRoutes = AuthRoutes = {}));
var PostRoutes;
(function (PostRoutes) {
    PostRoutes["ADD_POST"] = "/add";
    PostRoutes["UPDATE_POST"] = "/update";
    PostRoutes["DELETE_POST"] = "/delete";
    PostRoutes["GET_ALL_POSTS"] = "/all";
    PostRoutes["GET_SINGLE_POST"] = "/single";
})(PostRoutes || (exports.PostRoutes = PostRoutes = {}));
var CommentRoutes;
(function (CommentRoutes) {
    CommentRoutes["ADD_COMMENT"] = "/add";
    CommentRoutes["GET_COMMENT"] = "/get";
    CommentRoutes["DELETE_COMMENT"] = "/delete";
    CommentRoutes["UPDATE_COMMENT"] = "/update";
})(CommentRoutes || (exports.CommentRoutes = CommentRoutes = {}));
var LikeRoutes;
(function (LikeRoutes) {
    LikeRoutes["ADD_LIKE"] = "/add";
    LikeRoutes["GET_LIKES"] = "/get";
})(LikeRoutes || (exports.LikeRoutes = LikeRoutes = {}));
