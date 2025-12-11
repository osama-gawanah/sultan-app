

export function DashboardPreview() {



  return (
    <div className="w-[calc(100vw-32px)] md:w-[1160px]">
      <div className="bg-[hsl(25,100%,65%)]/50 rounded-2xl p-2 shadow-2xl">
        <video
          src="/vidoe.webm"
          loop
          muted
          playsInline
          className="w-full h-[550px] object-fill rounded-xl shadow-lg"
        />
      </div>
    </div>
  )
}
