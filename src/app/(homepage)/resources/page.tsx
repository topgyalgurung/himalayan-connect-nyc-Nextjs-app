import prisma from "@/lib/prisma";
import ResourceCard from "./ResourceCard";

export default async function Resources() {
  const resources = await prisma.resource.findMany();
  return (
    <div>
      {resources.map((res) => {
        return <ResourceCard key={res.id} {...res} />;
      })}
    </div>
  );
}
