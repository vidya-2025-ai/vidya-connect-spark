
import api from './index';
import { CommunityPost, PostComment } from './types';

export const communityService = {
  getPosts: async (): Promise<CommunityPost[]> => {
    const response = await api.get<CommunityPost[]>('/community/posts');
    return response.data;
  },
  
  createPost: async (postData: { title: string, content: string }): Promise<CommunityPost> => {
    const response = await api.post<CommunityPost>('/community/posts', postData);
    return response.data;
  },
  
  getPostComments: async (postId: string): Promise<PostComment[]> => {
    const response = await api.get<PostComment[]>(`/community/posts/${postId}/comments`);
    return response.data;
  },
  
  addComment: async (postId: string, commentData: { content: string }): Promise<PostComment> => {
    const response = await api.post<PostComment>(`/community/posts/${postId}/comments`, commentData);
    return response.data;
  },
  
  likePost: async (postId: string): Promise<{ id: string, likes: number }> => {
    const response = await api.post<{ id: string, likes: number }>(`/community/posts/${postId}/like`);
    return response.data;
  },
  
  unlikePost: async (postId: string): Promise<{ id: string, likes: number }> => {
    const response = await api.post<{ id: string, likes: number }>(`/community/posts/${postId}/unlike`);
    return response.data;
  }
};

export default communityService;
