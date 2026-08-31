import Image from "next/image";

export function PhoneMockup() {
  return (
    <div className="relative">
      <div className="border-foreground relative h-[520px] w-[260px] overflow-hidden rounded-[46px] border-[10px] bg-foreground p-2.5 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:h-[640px] sm:w-[320px] sm:rounded-[56px] sm:border-[12px] sm:p-3">
        <div className="bg-background flex h-full flex-col overflow-hidden rounded-[36px] sm:rounded-[40px]">
          <div className="bg-primary flex flex-col gap-6 rounded-b-[32px] px-6 pt-10 pb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="bg-cyan flex size-6 items-center justify-center overflow-hidden rounded-lg">
                  <Image
                    src="/icons/logo-mark.svg"
                    alt=""
                    width={14}
                    height={10}
                    unoptimized
                    className="size-[14px] object-contain brightness-0 invert"
                  />
                </span>
                <span className="text-xs font-extrabold tracking-tight text-white italic uppercase">
                  SUBUP
                </span>
              </div>
              <span className="size-8 rounded-full bg-white/20" />
            </div>
            <div className="flex flex-col items-center gap-3">
              <span className="size-16 rounded-full border-4 border-white bg-gray-200 shadow-lg" />
              <span className="h-4 w-24 rounded-full bg-white/20" />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between px-5 pt-6">
            <div className="flex flex-col gap-3">
              <span className="h-4 w-32 rounded bg-gray-200" />
              <div className="flex h-32 flex-col gap-2 rounded-2xl border border-[#f3f4f6] bg-white p-4 shadow-sm">
                <div className="flex justify-between">
                  <span className="h-3 w-20 rounded bg-cyan/30" />
                  <span className="h-3 w-10 rounded bg-[#f3f4f6]" />
                </div>
                <span className="h-4 w-40 rounded bg-primary/10" />
                <span className="h-3 w-28 rounded bg-[#f3f4f6]" />
              </div>
            </div>
            <div className="flex justify-between border-t border-[#f3f4f6] px-2 py-4">
              <span className="size-6 rounded bg-cyan/20" />
              <span className="size-6 rounded bg-gray-100" />
              <span className="size-6 rounded bg-gray-100" />
              <span className="size-6 rounded bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-6 -left-8 -rotate-6 rounded-[32px] border-4 border-[#fefefd] bg-gold p-6 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:-left-12">
        <div className="flex items-center gap-4">
          <span className="bg-primary flex size-12 items-center justify-center overflow-hidden rounded-full">
            <Image
              src="/icons/star.svg"
              alt=""
              width={18}
              height={19}
              unoptimized
              className="size-[18px] object-contain brightness-0 invert"
            />
          </span>
          <div>
            <p className="text-primary m-0 text-[10px] font-bold tracking-widest uppercase opacity-60">
              Elite rank
            </p>
            <p className="text-primary m-0 text-3xl font-extrabold tracking-tight">1,250</p>
          </div>
        </div>
      </div>
    </div>
  );
}
