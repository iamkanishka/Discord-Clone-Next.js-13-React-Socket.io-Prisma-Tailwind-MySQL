const Authlayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <div className="h-screen flex items-center justify-center">
         <div>{children}</div>
      </div>
   );
}

export default Authlayout;