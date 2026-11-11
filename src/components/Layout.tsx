import { Outlet } from "react-router-dom";
import NavbarMonogramSilver from "@/components/navbars/NavbarMonogramSilver";
import FooterTabPanel from "@/components/sections/footer/FooterTabPanel";

export default function Layout() {
  return (
    <div className="relative isolate min-h-svh flex flex-col bg-background text-foreground" data-button="silver" data-card="filled" data-pattern="grain">
      <header data-webild-section="Header">
        <NavbarMonogramSilver
          brand="KASHDAONE BEATS"
          navItems={[
            {
              name: "Beat Folders",
              href: "#gallery"
            },
            {
              name: "Licensing",
              href: "#pricing-silver-tiers"
            },
            {
              name: "Sound",
              href: "#about"
            },
            {
              name: "FAQ",
              href: "#faq-two-voice-accordion"
            },
            {
              name: "Inquire",
              href: "#contact-form-portrait"
            }
          ]}
          primaryButton={{
            text: "Reserve Production",
            href: "#contact-form-portrait"
          }}
          contact={[
            {
              label: "contact@kashdaonebeats.com",
              href: "mailto:contact@kashdaonebeats.com"
            },
            {
              label: "Atlanta, GA",
              href: "#contact-form-portrait"
            }
          ]}
        />
      </header>
      <main className="flex-grow" data-button="silver" data-card="filled" data-pattern="grain">
        <Outlet />
      </main>
      <footer data-webild-section="Footer" data-section="footer">
        <FooterTabPanel
          titleHeavy="KASHDAONE"
          titleSerif="BEATS."
          imageSrc="https://img.b2bpic.net/free-photo/medium-shot-musician-wearing-headphones_23-2150206741.jpg"
          imageAlt="Musician wearing headphones at mixing board in studio"
          pagesTitle="Navigation"
          pages={[
            {
              label: "Home",
              href: "#hero"
            },
            {
              label: "About",
              href: "#about"
            },
            {
              label: "Sound Folders",
              href: "#gallery"
            },
            {
              label: "Licensing Tiers",
              href: "#pricing-silver-tiers"
            },
            {
              label: "FAQ",
              href: "#faq-two-voice-accordion"
            },
            {
              label: "Inquire",
              href: "#contact-form-portrait"
            }
          ]}
          socialsTitle="Connect"
          socials={[
            {
              label: "YouTube",
              href: "#"
            },
            {
              label: "Instagram",
              href: "#"
            },
            {
              label: "X",
              href: "#"
            },
            {
              label: "SoundCloud",
              href: "#"
            }
          ]}
          buttonText="Request Private Folder Access"
          buttonHref="#contact-form-portrait"
          legal={[
            {
              label: "Privacy policy",
              href: "#"
            },
            {
              label: "Terms of service",
              href: "#"
            }
          ]}
        />
      </footer>
    </div>
  );
}
