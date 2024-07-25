import { Metadata } from "next";
import { ResolvingMetadata } from "next";
import React from "react";
import { getFrameMetadata } from "@coinbase/onchainkit/core";
import { getInitialFrameImage } from "./utils";

type Props = {
  params: { id: string };
  searchParams: {
    characterName: string;
    imageId: string;
    characterPersonality1: string;
    characterPersonality2: string;
    characterPersonality3: string;
    characterDescription: string;
  };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  console.log(searchParams.imageId);
  const image = await getInitialFrameImage(
    searchParams.imageId,
    searchParams.characterName,
    searchParams.characterDescription
  );

  const frameMetadata = {
    "fc:frame": "vNext",
    "fc:frame:image": `data:image/png;base64,${image}`,
    "fc:frame:button:1": JSON.stringify({
      label: "Create your own AI Character",
      action: "link",
      target: "https://cast-ai.vercel.app/",
    }),
    "fc:frame:button:2": JSON.stringify({
      label: "Chat",
      action: "post",
    }),
    "fc:frame:post_url": `${process.env.NEXT_PUBLIC_URL}chatInitial/1?characterName=${searchParams.characterName}&characterId=${id}&imageId=${searchParams.imageId}&characterDescription=${searchParams.characterDescription}&characterPersonality1=${searchParams.characterPersonality1}&characterPersonality2=${searchParams.characterPersonality2}&characterPersonality3=${searchParams.characterPersonality3}`,
  };

  return {
    title: "cast-ai.vercel.app",
    description: "Cast your own AI character",
    openGraph: {
      title: "cast-ai.vercel.app",
      description: "Cast your own AI character",
      images: [`${process.env.NEXT_PUBLIC_URL}character-collage.jpg`],
    },
    other: {
      ...frameMetadata,
    },
  };
}

const CharacterPage = () => {
  return <div>Character Page</div>;
};

export default CharacterPage;
