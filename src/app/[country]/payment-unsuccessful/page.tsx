export default function Page() {
  return (
    <main className="flex min-h-screen items-start justify-center bg-[#f3f3f1] px-4 pb-8 pt-14 text-center sm:items-center sm:px-6 sm:py-8">
      <div className="w-full max-w-[360px] rounded-[28px] bg-white px-5 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.14)] sm:max-w-[720px] sm:rounded-[42px] sm:px-10 sm:py-14 sm:shadow-[0_24px_90px_rgba(0,0,0,0.14)]">
        <img
          src="/images/linktree-logo.png"
          alt="Linktree"
          draggable={false}
          className="mx-auto mb-7 h-auto w-[112px] sm:mb-10 sm:w-[180px]"
        />

        <div className="mx-auto mb-6 flex h-[54px] w-[54px] items-center justify-center rounded-full bg-[#ff4d4d] text-[26px] font-black leading-none text-white sm:mb-8 sm:h-[74px] sm:w-[74px] sm:text-[34px]">
          !
        </div>

        <h1 className="mx-auto max-w-[310px] text-[34px] font-black leading-[0.94] tracking-[-1.4px] text-black sm:max-w-none sm:text-[56px] sm:leading-[0.9] sm:tracking-[-2.5px]">
          Payment was not completed
        </h1>

        <p className="mx-auto mt-5 max-w-[300px] text-[15px] font-bold leading-[1.35] text-[#555555] sm:mt-6 sm:max-w-[560px] sm:text-[20px] sm:leading-[1.25]">
          No payment has been taken. You can try again or return home.
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4">
          <a
            href="../shop"
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-[#ccff00] px-6 text-[16px] font-black text-black no-underline sm:h-[58px] sm:w-auto sm:px-10 sm:text-[18px]"
          >
            Try again
          </a>

          <a
            href="../home"
            className="flex h-[52px] w-full items-center justify-center rounded-full bg-black px-6 text-[16px] font-black text-white no-underline sm:h-[58px] sm:w-auto sm:px-10 sm:text-[18px]"
          >
            Go home
          </a>
        </div>
      </div>
    </main>
  );
}