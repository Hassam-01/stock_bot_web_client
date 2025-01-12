
function Footer() {
   const  currentYear = new Date().getFullYear();
  return (
    <footer className=" text-white  items-center text-center">
      © {currentYear} TeamSasta AI. All rights reserved.
    </footer>
  )
}

export default Footer