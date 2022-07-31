const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} = require("graphql");
const { User, Post, Comment } = require("../models");

const UserType = new GraphQLObjectType({
  name: "UserType",
  description: "typed for the user model",
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    displayName: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

const PostType = new GraphQLObjectType({
  name: "PostType",
  description: "typed for the post model",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    author: {
      type: UserType,
      resolve: (parent) => User.findById(parent.authorId),
    },
    comment: {
      type: new GraphQLList(CommentType),
      resolve: (parent) => Comment.find({ postId: parent._id }),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  }),
});

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  description: "typed for the comment model",
  fields: {
    id: { type: GraphQLID },
    comment: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (parent) => User.findById(parent.userId),
    },
    post: {
      type: PostType,
      resolve: (parent) => Post.findById(parent.postId),
    },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
  },
});

module.exports = { UserType, PostType, CommentType };