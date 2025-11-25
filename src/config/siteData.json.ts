export interface SiteDataProps {
	name: string;
	title: string;
	description: string;
	useViewTransitions?: boolean; // defaults to false. Set to true to enable some Astro 3.0 view transitions
	author: {
		name: string;
		email: string;
		twitter: string; // used for twitter cards when sharing a blog post on twitter
	};
	defaultImage: {
		src: string;
		alt: string;
	};
}

// Update this file with your site specific information
const siteData: SiteDataProps = {
	name: "The Two Chicks Photography",
	// Your website's title and description (meta fields)
	title: "The Two Chicks Photography - NJ Family & Newborn Photographer",
	description:
		"Newborns, Families, Special Needs, LGBTQ+ Friendly, Maternity, Birth Photography in New Jersey",
	useViewTransitions: true,
	// Your information!
	author: {
		name: "The Two Chicks Photography",
		email: "thetwochicksphotograph@gmail.com",
		twitter: "thetwochicksphotography", // used for twitter cards when sharing a blog post on twitter
	},

	// default image for meta tags if the page doesn't have an image already
	defaultImage: {
		src: "/images/logo-min.png",
		alt: "Cosmic Themes logo",
	},
};

export default siteData;
