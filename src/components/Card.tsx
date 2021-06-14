import {
  Box,
  Heading,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';

import { ContextMenu } from './ContextMenu';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
}

interface CardProps {
  data: Card;
  viewImage: (url: string) => void;
  onUpdateImage: () => void;
  onDeleteImage: () => void;
}

export function Card({
  data,
  viewImage,
  onUpdateImage,
  onDeleteImage,
}: CardProps): JSX.Element {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box key={data.ts} borderRadius="md" bgColor="pGray.800">
      <Skeleton isLoaded={!isLoading}>
        <Image
          src={data.url}
          alt={data.title}
          objectFit="cover"
          w="max"
          h={48}
          borderTopRadius="md"
          onClick={() => viewImage(data.url)}
          onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      </Skeleton>

      <Flex pt={5} pb={4} px={6} justify="space-between">
        <Box>
          {isLoading ? (
            <>
              <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
              <SkeletonText fontSize="md" mt={7} noOfLines={1} />
            </>
          ) : (
            <>
              <Heading fontSize="2xl">{data.title}</Heading>
              <Text mt={2.5} fontSize="md">
                {data.description}
              </Text>
            </>
          )}
        </Box>
        <ContextMenu
          onUpdateImage={onUpdateImage}
          onDeleteImage={onDeleteImage}
        />
      </Flex>
    </Box>
  );
}
