"use client"

const Testimonial = ({
  quote,
  author,
  workplaceOrSocial,
  socialLink,
}: {
  quote: string;
  author: string;
  workplaceOrSocial?: string;
  socialLink?: string;
}) => {
  return (
    <div className="mx-auto text-center">
      <p className="text-2xl md:text-4xl mb-6">“{quote}”</p>
      <div>
        <p className="mb-2">{author}</p>
        {socialLink && workplaceOrSocial ? (
          <a
            className="text-platform-700 hover:text-platform-300"
            href={socialLink}
            target="_blank"
            rel="noopener noreferrer]"
          >
            {workplaceOrSocial}
          </a>
        ) : workplaceOrSocial ? (
          <p className="text-gray-400">{workplaceOrSocial}</p>
        ) : null}
      </div>
    </div>
  );
};

export default Testimonial;
