import Link from "next/link";

const BreadCrumbs = ({ path }: { path: string }) => {
  const replacedPath = path.replace("/", "");
  const pathName = replacedPath.length > 0 ? replacedPath : "dashboard";
  return (
    <h3 className="text-cloudBurst dark:text-white font-normal text-xs capitalize">
      {path !== "/" ? (
        <span>
          <Link href="/">Dashboard</Link> / {pathName}
        </span>
      ) : (
        pathName
      )}
    </h3>
  );
};

export default BreadCrumbs;
