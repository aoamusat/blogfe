// store/index.js
export const state = () => ({
  comments: [],
});

export const mutations = {
  setComments(state, comments) {
    state.comments = comments;
  },
  addComment(state, comment) {
    state.comments.push(comment);
  },
  updateComment(state, updatedComment) {
    const index = state.comments.findIndex(
      (comment) => comment.id === updatedComment.id
    );
    if (index !== -1) {
      state.comments.splice(index, 1, updatedComment);
    }
  },
  deleteComment(state, commentId) {
    state.comments = state.comments.filter(
      (comment) => comment.id !== commentId
    );
  },
};

export const actions = {
  async fetchComments({ commit }) {
    const { data } = await this.$axios.get("/comments");
    commit("setComments", data);
  },
  async createComment({ commit }, commentData) {
    const { data } = await this.$axios.post("/comments", commentData);
    commit("addComment", data);
  },
  async updateComment({ commit }, { id, commentData }) {
    const { data } = await this.$axios.put(`/comments/${id}`, commentData);
    commit("updateComment", data);
  },
  async deleteComment({ commit }, commentId) {
    await this.$axios.delete(`/comments/${commentId}`);
    commit("deleteComment", commentId);
  },
};
