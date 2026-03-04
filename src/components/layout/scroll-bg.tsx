export const ScrollBg =()=> {
    return (
      <div
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none bg-repeat"
        style={{
          backgroundImage: "url('/imgs/doodle_mega_tile_img.png')",
          backgroundSize: "1462px 387px",
          transform: "translateX(-10px)",
        }}
      />
    );
}