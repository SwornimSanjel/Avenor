export default function AmbientGlow() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -right-40 -top-48 h-[36rem] w-[36rem] rounded-full bg-accent/[0.04] blur-[160px]" />
      <div className="absolute -bottom-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-iris/[0.03] blur-[170px]" />
    </div>
  );
}
