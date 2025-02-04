export const endpoints = {
    root: '/',
    auth: {
      signUp: '/auth/sign-up',
      signIn: '/auth/sign-in',
    },
    user: {
      list: '/user',
      getById: (id: number) => `/user/${id}`,
      getPostsByUserId: (id: number) => `/user/${id}/posts`,
      getCommentsByUserId: (id: number) => `/user/${id}/comments`,
    },
    post: {
      list: '/post',
      getById: (id: number) => `/post/${id}`,
      getCommentsByPostId: (id: number) => `/post/${id}/comments`,
    },
    comment: {
      getById: (id: number) => `/comment/${id}`,
    },
    tag: {
      list: '/tag',
      getById: (id: number) => `/tag/${id}`,
      getPostsByTagId: (id: number) => `/tag/${id}/posts`,
    },
  };