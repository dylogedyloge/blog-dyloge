import { Metadata } from "next";
import { templateDocs, templateMeta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { siteConfig } from "@/lib/site";

const templateSource = loader({
  baseUrl: "/templates",
  source: createMDXSource(templateDocs, templateMeta),
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Template Not Found",
        description: "The requested template could not be found.",
      };
    }

    const page = templateSource.getPage([slug]);

    if (!page) {
      return {
        title: "Template Not Found",
        description: "The requested template could not be found.",
      };
    }

    const ogUrl = `${siteConfig.url}/templates/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;

    return {
      title: page.data.title,
      description: page.data.description,
      keywords: [
        page.data.title,
        ...(Array.isArray(page.data.tags) ? page.data.tags : []),
        "Template",
        "Resource",
        "Web Development",
        "Programming",
        "Technology",
        "Software Engineering",
      ],
      authors: [
        {
          name: (page.data.author as string) || "Magic UI",
          url: siteConfig.url,
        },
      ],
      creator: (page.data.author as string) || "Magic UI",
      publisher: "Magic UI",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: page.data.title,
        description: page.data.description,
        type: "article",
        url: ogUrl,
        publishedTime: page.data.date as string,
        authors: [(page.data.author as string) || "Magic UI"],
        tags: Array.isArray(page.data.tags) ? page.data.tags : undefined,
        images: [
          {
            url: (page.data.thumbnail as string) || ogImage,
            width: 1200,
            height: 630,
            alt: page.data.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: page.data.title,
        description: page.data.description,
        images: [(page.data.thumbnail as string) || ogImage],
        creator: "@dillionverma",
        site: "@dillionverma",
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Template Not Found",
      description: "The requested template could not be found.",
    };
  }
}
