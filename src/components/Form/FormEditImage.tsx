import { Box, Button, Stack, useToast } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { usePost } from '../../contexts/PostContext';
import { TextInput } from '../Input/TextInput';

type ImageProps = {
  id: string;
  title: string;
  description: string;
};

interface FormEditImageProps {
  closeModal: () => void;
  image: ImageProps;
}

export function FormEditImage({
  closeModal,
  image,
}: FormEditImageProps): JSX.Element {
  const toast = useToast();

  const formValidations = {
    title: {
      // TODO REQUIRED, MIN AND MAX LENGTH VALIDATIONS
      required: 'Título obrigatório',
      minLength: { value: 2, message: 'Mínimo de 2 caracteres' },
      maxLength: { value: 20, message: 'Máximo de 20 caracteres' },
    },
    description: {
      // TODO REQUIRED, MAX LENGTH VALIDATIONS
      required: 'Descrição obrigatória',
      maxLength: { value: 65, message: 'Máximo de 65 caracteres' },
    },
  };

  const { handleUpdatePost } = usePost();

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: {
      title: image.title,
      description: image.description,
    },
  });
  const { errors } = formState;

  const onSubmit = async (data: Record<string, unknown>): Promise<void> => {
    try {
      // TODO EXECUTE ASYNC MUTATION
      await handleUpdatePost({
        id: image.id,
        title: data.title as string,
        description: data.description as string,
      });
      // TODO SHOW SUCCESS TOAST
      toast({
        title: 'Dados atualizados',
        description: 'Dados da imagem foram atualizados com sucesso.',
      });
    } catch {
      // TODO SHOW ERROR TOAST IF SUBMIT FAILED
      toast({
        title: 'Falha no cadastro',
        description: 'Ocorreu um erro ao tentar atualizar os dados.',
      });
    } finally {
      // TODO CLEAN FORM, STATES AND CLOSE MODAL
      reset();
      closeModal();
    }
  };

  return (
    <Box as="form" width="100%" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <TextInput
          placeholder="Título da imagem..."
          // TODO SEND TITLE ERRORS
          error={errors.title}
          // TODO REGISTER TITLE INPUT WITH VALIDATIONS
          {...register('title', formValidations.title)}
        />

        <TextInput
          placeholder="Descrição da imagem..."
          // TODO SEND DESCRIPTION ERRORS
          error={errors.description}
          // TODO REGISTER DESCRIPTION INPUT WITH VALIDATIONS
          {...register('description', formValidations.description)}
        />
      </Stack>

      <Button
        my={6}
        isLoading={formState.isSubmitting}
        isDisabled={formState.isSubmitting}
        type="submit"
        w="100%"
        py={6}
      >
        Enviar
      </Button>
    </Box>
  );
}
