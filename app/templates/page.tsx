import { templateDocs, templateMeta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { Suspense } from "react";
import { BlogCard } from "@/components/blog-card";
import { TagFilter } from "@/components/tag-filter";
import { TextAnimate } from "@/components/magicui/text-animate";
import { HighlightText } from "@/components/ui/shadcn-io/highlight-text";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TemplateData {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  authorImage?: string;
  thumbnail?: string;
}

interface TemplatePage {
  url: string;
  data: TemplateData;
}

const templateSource = loader({
  baseUrl: "/templates",
  source: createMDXSource(templateDocs, templateMeta),
});

const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export default async function TemplatesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const allPages = templateSource.getPages() as TemplatePage[];
  const sortedTemplates = allPages.sort((a, b) => {
    const dateA = new Date(a.data.date).getTime();
    const dateB = new Date(b.data.date).getTime();
    return dateB - dateA;
  });

  const allTags = [
    "All",
    ...Array.from(
      new Set(sortedTemplates.flatMap((template) => template.data.tags || []))
    ).sort(),
  ];

  const selectedTag = resolvedSearchParams.tag || "All";
  const filteredTemplates =
    selectedTag === "All"
      ? sortedTemplates
      : sortedTemplates.filter((template) =>
          template.data.tags?.includes(selectedTag)
        );

  const tagCounts = allTags.reduce((acc, tag) => {
    if (tag === "All") {
      acc[tag] = sortedTemplates.length;
    } else {
      acc[tag] = sortedTemplates.filter((template) =>
        template.data.tags?.includes(tag)
      ).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background relative">
      <div className="absolute top-0 left-0 z-0 w-full h-[200px] [mask-image:linear-gradient(to_top,transparent_25%,black_95%)]"></div>
      <div className="p-6 border-b border-border flex flex-col gap-6 min-h-[250px] justify-center relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex w-full max-w-sm items-center gap-2 mb-2">
            <div className="flex flex-col gap-1">
              <HighlightText
                text=" Subscribe & get 50% off on my Etsy & Creative Market shops!"
                inView={true}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-pretty text-sm"
              />
              <div className="flex w-full max-w-sm items-center gap-2">
                <Input type="email" placeholder="Email" />{" "}
                <Button type="submit" variant="outline">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col gap-2">
            <h1 className="font-medium text-4xl md:text-5xl tracking-tighter">
              Templates
            </h1>

            <TextAnimate
              animation="blurIn"
              as="p"
              className="text-muted-foreground text-sm md:text-base lg:text-lg"
            >
              A collection of templates and resources from Dyloge.
            </TextAnimate>
          </div>
        </div>
        {allTags.length > 0 && (
          <div className="max-w-7xl mx-auto w-full">
            <TagFilter
              tags={allTags}
              selectedTag={selectedTag}
              tagCounts={tagCounts}
            />
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-0">
        <Suspense fallback={<div>Loading templates...</div>}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative overflow-hidden border-x border-border ${
              filteredTemplates.length < 4 ? "border-b" : "border-b-0"
            }`}
          >
            {filteredTemplates.map((template) => {
              const date = new Date(template.data.date);
              const formattedDate = formatDate(date);

              return (
                <BlogCard
                  key={template.url}
                  url={template.url}
                  title={template.data.title}
                  description={template.data.description}
                  date={formattedDate}
                  thumbnail={template.data.thumbnail}
                  showRightBorder={filteredTemplates.length < 3}
                />
              );
            })}
          </div>
        </Suspense>
      </div>
    </div>
  );
}
