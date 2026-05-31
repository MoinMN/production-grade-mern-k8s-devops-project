import { Link } from 'react-router-dom';

const AdminFooter = () => {
  const socialMediaList = [
    {
      platformName: "LinkedIn",
      icon: "fa-brands fa-linkedin",
      hoverColor: "text-blue-500",
      link: "https://www.linkedin.com/in/moinnaik/"
    },
    {
      platformName: "Instagram",
      icon: "fa-brands fa-instagram",
      hoverColor: "text-red-500",
      link: "https://www.instagram.com/im_moin45/"
    },
    {
      platformName: "GitHub",
      icon: "fa-brands fa-github",
      hoverColor: "text-blue-500",
      link: "https://www.github.com/MoinMN"
    },
    {
      platformName: "Twitter",
      icon: "fa-brands fa-twitter",
      hoverColor: "text-blue-500",
      link: "https://x.com/MoinMN5"
    },
    {
      platformName: "Snapchat",
      icon: "fa-brands fa-snapchat",
      hoverColor: "text-yellow-500",
      link: "https://www.snapchat.com/add/im_moin45"
    },
    {
      platformName: "Telegram",
      icon: "fa-brands fa-telegram",
      hoverColor: "text-blue-500",
      link: "https://t.me/im_moin45"
    },
    {
      platformName: "Threads",
      icon: "fa-brands fa-threads",
      hoverColor: "text-red-500",
      link: "https://www.threads.net/@im_moin45"
    }
  ];

  return (
    <>
      <div className='bg-light-2 bottom-0 w-full shadow-inner transition-colors duration-300 ease-in-out px-4 text-lg max-md:text-base text-black'>
        <footer className="flex flex-wrap justify-between items-center py-3 my-4 border-top max-md:justify-center max-md:flex-col">
          <div className="flex flex-col my-1 courier">
            <span className="mb-3 mb-md-0 text-center">
              Developed & Maintained By{' '}
              <span className='text-light-primary cursor-pointer'>
                <Link to='http://linkedin.com/in/moinnaik/' target='_blank' className='font-semibold'>
                  Moin MN
                </Link>
              </span>
            </span>
            <span className='mb-3 mb-md-0 max-md:text-center'>
              version 26.2.13
            </span>
          </div>

          <ul className="flex justify-center items-center flex-wrap gap-3 my-1">
            {socialMediaList?.map(socialMedia => (
              <li key={socialMedia.link} className="">
                <Link className="" to={socialMedia.link} target='_blank'>
                  <i
                    className={`${socialMedia.icon} text-3xl max-sm:text-xl transition-colors duration-300 ease-in-out hover:${socialMedia?.hoverColor}`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </>
  )
}

export default AdminFooter
