import { useDisclosure } from '@chakra-ui/react';
import { useContext } from 'react';
import { createContext, ReactNode } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { api } from '../services/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

type CreatePostDTO = {
  title: string;
  description: string;
  url: string;
};

type EditPostDTO = {
  id: string;
  title: string;
  description: string;
};

interface PostContextData {
  viewPostModal: ModalProps;
  newPostModal: ModalProps;
  editPostModal: ModalProps;
  handleNewPost: (props: CreatePostDTO) => Promise<void>;
  handleUpdatePost: (props: EditPostDTO) => Promise<void>;
  handleDeletePost: (id: string) => Promise<void>;
}

const PostContext = createContext({} as PostContextData);

interface PostProviderProps {
  children: ReactNode;
}

export function PostProvider({ children }: PostProviderProps): JSX.Element {
  const viewPostModal = useDisclosure();
  const newPostModal = useDisclosure();
  const editPostModal = useDisclosure();

  const queryClient = useQueryClient();

  function invalidatePostsQuery(): Promise<void> {
    return queryClient.invalidateQueries('images');
  }

  // handle add new post
  const newPostMutation = useMutation(
    async ({ title, description, url }: CreatePostDTO) => {
      await api.post('/api/images', {
        title,
        description,
        url,
      });
    },
    { onSuccess: invalidatePostsQuery }
  );

  async function handleNewPost({
    title,
    description,
    url,
  }: CreatePostDTO): Promise<void> {
    return newPostMutation.mutateAsync({
      title,
      description,
      url,
    });
  }

  // handle update post
  const editPostMutation = useMutation(
    async ({ id, title, description }: EditPostDTO) => {
      await api.patch(`/api/images/${id}`, {
        title,
        description,
      });
    },
    { onSuccess: invalidatePostsQuery }
  );

  async function handleUpdatePost({
    id,
    title,
    description,
  }: EditPostDTO): Promise<void> {
    return editPostMutation.mutateAsync({
      id,
      title,
      description,
    });
  }

  // handle delete post
  const deletePostMutation = useMutation(
    async (id: string) => {
      await api.delete(`/api/images/${id}`);
    },
    { onSuccess: invalidatePostsQuery }
  );

  async function handleDeletePost(id: string): Promise<void> {
    return deletePostMutation.mutateAsync(id);
  }

  return (
    <PostContext.Provider
      value={{
        viewPostModal,
        newPostModal,
        editPostModal,
        handleNewPost,
        handleUpdatePost,
        handleDeletePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

export function usePost(): PostContextData {
  return useContext(PostContext);
}
