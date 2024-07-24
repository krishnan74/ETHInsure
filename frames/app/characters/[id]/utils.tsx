import * as fs from "fs";
import { join } from "path";
import satori from "satori";
import sharp from "sharp";

const FONT_DIR = join(process.cwd(), "font");

const interMedium = fs.readFileSync(join(FONT_DIR, "Inter-Medium.ttf"));
const interBold = fs.readFileSync(join(FONT_DIR, "Inter-Bold.ttf"));
const interLight = fs.readFileSync(join(FONT_DIR, "Inter-Light.ttf"));

export const getInitialFrameImage = async (
  imageURL: string,
  characterName: string,
  characterDescription: string
) => {
  const svg = await satori(
    <div
      style={{
        fontFamily: "Inter",
        position: "relative", // Ensure positioning for absolute elements
        width: 800,
        height: 800,
        backgroundImage: `url('${process.env.NEXT_PUBLIC_URL}character-collage.jpg')`,
        backgroundSize: "cover",
        // Adjust opacity for background image
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          
          justifyContent: "center",
          position: "absolute",
          backgroundColor: "rgba(255, 255,255, 1)", // Semi-transparent white background
          border: "1px solid #444444",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <img
          src={imageURL}
          height={300}
          width={300}
          alt=""
          style={{ borderRadius: "10px" }}
        />
        <h2 style={{ fontFamily: "Inter", fontWeight: 800 }}>
          {characterName}
        </h2>
        <p style={{ fontFamily: "Inter", fontWeight: 300 }}>
          {characterDescription}
        </p>
      </div>
    </div>,
    {
      width: 800,
      height: 800,
      fonts: [
        { name: "Inter", data: interBold, weight: 800, style: "normal" },
        { name: "Inter", data: interMedium, weight: 600, style: "normal" },
        { name: "Inter", data: interLight, weight: 300, style: "normal" },
      ],
    }
  );

  return (await sharp(Buffer.from(svg)).toFormat("png").toBuffer()).toString(
    "base64"
  );
};
