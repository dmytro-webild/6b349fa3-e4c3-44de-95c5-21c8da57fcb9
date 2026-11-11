import HeroShrinkSignedCard from "@/components/sections/hero/HeroShrinkSignedCard";
import AboutTwoVoiceStatement from "@/components/sections/about/AboutTwoVoiceStatement";
import GallerySidewaysColourRun from "@/components/sections/gallery/GallerySidewaysColourRun";
import PricingSilverTiers from "@/components/sections/pricing/PricingSilverTiers";
import TestimonialFanStack from "@/components/sections/testimonial/TestimonialFanStack";
import FaqTwoVoiceAccordion from "@/components/sections/faq/FaqTwoVoiceAccordion";
import ContactFormPortrait from "@/components/sections/contact/ContactFormPortrait";
import ContourLinesBackground from "@/components/backgrounds/ContourLinesBackground";
import LoaderMonogramDraw from "@/components/loaders/LoaderMonogramDraw";

export default function HomePage() {
  return (
    <>
      <ContourLinesBackground
        className="text-foreground/8"
      />

      <LoaderMonogramDraw
        label="Velocity Beats"
        onComplete={() => {}}
      />

      <div id="hero" data-webild-section="HeroShrinkSignedCard" data-webild-section-id="HeroShrinkSignedCard-1" data-section="hero" data-scene>
        <HeroShrinkSignedCard
          introDelay={2.6}
          eyebrow="Exclusive Urban Production"
          title="Velocity Beats"
          serifTitle="Hip Hop & R&B Production"
          primaryButton={{
            text: "Browse beats",
            href: "#gallery"
          }}
          secondaryButton={{
            text: "Book exclusive",
            href: "#contact-form-portrait"
          }}
          imageSrc="https://img.b2bpic.net/free-photo/dynamic-glowing-light-trails-abstract-background_84443-86837.jpg"
          imageAlt="dynamic glowing light trails background"
          marquee={[
            "For others, a beat is just a loop",
            "For us, it is a ready hit single"
          ]}
        />
      </div>

      <div id="about" data-webild-section="AboutTwoVoiceStatement" data-webild-section-id="AboutTwoVoiceStatement-1" data-section="about">
        <AboutTwoVoiceStatement
          monogram="VB"
          label="Producer guarantee"
          text="Every track from Velocity Beats delivers radio-ready punch without compromise."
          serifWords={[
            "radio-ready",
            "compromise"
          ]}
        />
      </div>

      <div id="gallery" data-webild-section="GallerySidewaysColourRun" data-webild-section-id="GallerySidewaysColourRun-1" data-section="gallery" data-scene data-gallery>
        <GallerySidewaysColourRun
          statement="Exclusive Hip Hop and R&B beat collections for artists."
          statementEmphasis={[
            "Exclusive",
            "collections"
          ]}
          items={[
            {
              imageSrc: "https://img.b2bpic.net/free-photo/cheerful-young-dj-spinning-turntable_1157-46926.jpg",
              imageAlt: "Cheerful young DJ spinning on turntable.",
              caption: "2024 · Hip Hop session",
              orientation: "landscape"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/outsdie-portrait-charming-smiling-pretty-woman-with-dark-hair-dressed-leather-jacket-black-sunglasses-listening-music-earphones_291650-7.jpg",
              imageAlt: "Outsdie portrait of charming smiling pretty woman with dark hair dressed leather jacket and black sunglasses listening to music in earphones",
              caption: "2024 · Soulful R&B studio",
              orientation: "portrait"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/close-up-portrait-adult-handsome-ginger-male-stylish-navy-t-shirt-listening-music-through-headphones-while-posing-blue-studio-background-human-facial-expressions-sincere-emoti_639032-2156.jpg",
              imageAlt: "Close-up portrait of an adult handsome ginger male in a stylish navy t-shirt listening to the music through a headphones while posing on blue studio background. Human facial expressions. Sincere emoti",
              caption: "2024 · Vintage Boom Bap",
              orientation: "landscape"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-from-back-smiling-woman-white-t-shirt-having-fun-home-glad-brown-haired-girl-relaxing-morning_197531-9412.jpg",
              imageAlt: "Portrait from back of smiling woman in white t-shirt having fun at home. glad brown-haired girl relaxing in morning.",
              caption: "2025 · Trap synth mixing",
              orientation: "portrait"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-beautiful-young-woman-with-colorful-face-make-up_23-2149580885.jpg",
              imageAlt: "Portrait of beautiful young woman with colorful face make-up",
              caption: "2025 · Neo-Soul arrangement",
              orientation: "landscape"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/photo-camera-still-life_23-2150630961.jpg",
              imageAlt: "Photo camera still life",
              caption: "2025 · Sound design lab",
              orientation: "landscape"
            },
            {
              imageSrc: "https://img.b2bpic.net/free-photo/two-female-friend-s-hand-holding-green-gift-box_23-2147888236.jpg",
              imageAlt: "Two female friend's hand holding green gift box",
              caption: "2026 · Private beat folder",
              orientation: "portrait"
            }
          ]}
        />
      </div>

      <div id="pricing-silver-tiers" data-webild-section="PricingSilverTiers" data-webild-section-id="PricingSilverTiers-1" data-section="pricing-silver-tiers">
        <PricingSilverTiers
          heavyTitle="Pick Your"
          serifTitle="License Tier"
          items={[
            {
              name: "Non-Exclusive",
              price: "$150",
              period: "per beat",
              description: "Standard leasing for independent releases and stream promotion.",
              features: [
                "High-quality MP3 and WAV files",
                "Streaming up to 100,000 plays",
                "Standard master stereo mix"
              ],
              cta: {
                text: "Inquire for lease",
                href: "#contact-form-portrait"
              }
            },
            {
              name: "Exclusive",
              price: "$800",
              period: "per beat",
              description: "Full ownership with trackouts and beat removal from catalog.",
              features: [
                "Full WAV trackouts and raw stems",
                "100% exclusive rights and catalog removal",
                "Custom arrangement tweaks included",
                "Unlimited streaming and commercial rights"
              ],
              featured: true,
              badge: "Full Ownership",
              cta: {
                text: "Request exclusivity",
                href: "#contact-form-portrait"
              }
            }
          ]}
        />
      </div>

      <div id="testimonial" data-webild-section="TestimonialFanStack" data-webild-section-id="TestimonialFanStack-1" data-section="testimonial">
        <TestimonialFanStack
          monogram="Velocity Beats Studio"
          heavyTitle="Artist"
          serifTitle="Co-Signs"
          items={[
            {
              quote: "Velocity Beats gave my lead single the exact bounce and polished sound it needed. The master mix sat perfectly right away.",
              name: "Marcus T.",
              role: "Recording Artist",
              imageSrc: "https://img.b2bpic.net/free-photo/cheerful-afro-american-with-white-shirt-earphones-posing-camera-blue-wall_181624-37616.jpg",
              imageAlt: "Cheerful Afro American with a white shirt and earphones posing at camera on a blue wall"
            },
            {
              quote: "The heavy 808s and crisp snare placement gave my track immediate radio presence. Outstanding production quality.",
              name: "Devon K.",
              role: "Hip Hop Vocalist",
              imageSrc: "https://img.b2bpic.net/free-photo/you-re-late-portrait-angry-beautiful-black-skinned-mature-guy-with-afro-hairstyle-leather-jacket-pointing-hand-watch-with-unsatisfied-expression-after-friend-being-late-hour_176420-11123.jpg",
              imageAlt: "You're late. Portrait of angry beautiful black-skinned mature guy with afro hairstyle in leather jacket pointing on hand watch with unsatisfied expression after friend being late for hour."
            },
            {
              quote: "Lush vocal chords and silk keys made writing my song effortless. The beat licensing process was seamless.",
              name: "Elena R.",
              role: "R&B Singer",
              imageSrc: "https://img.b2bpic.net/free-photo/smiling-woman-with-headphones-standing-white-background-high-quality-photo_114579-61123.jpg",
              imageAlt: "Smiling woman with headphones standing on white background. High quality photo"
            },
            {
              quote: "Exclusive production rights let me sign my master deal without sound clearings or hassle. Worth every penny.",
              name: "Sarah M.",
              role: "Independent Artist",
              imageSrc: "https://img.b2bpic.net/free-photo/portrait-woman-emerald-green-coat-wooden-wall_197531-16401.jpg",
              imageAlt: "Portrait of woman in emerald green coat on wooden wall"
            },
            {
              quote: "We sourced two placement tracks for our artist project here. Pristine arrangement and mix engineering.",
              name: "Darius Vance",
              role: "Label Executive",
              imageSrc: "https://img.b2bpic.net/free-photo/young-pensive-man-wireless-headphones-is-listening-trendy-music_613910-21591.jpg",
              imageAlt: "Young pensive man in wireless headphones is listening trendy music."
            },
            {
              quote: "The private catalog gave us access to rare sonic textures. Our team secured three sync licenses instantly.",
              name: "Nia Brooks",
              role: "Soul Vocalist",
              imageSrc: "https://img.b2bpic.net/free-photo/red-haired-girl-smiles-because-sun-strokes-her-cheeks_8353-9131.jpg",
              imageAlt: "smiling woman sitting by window"
            },
            {
              quote: "Hard-hitting bounce and clean frequency separation. Recorded vocal takes glided over the beat effortlessly.",
              name: "Tariq Reed",
              role: "Trap Artist",
              imageSrc: "https://img.b2bpic.net/free-photo/front-view-man-making-pop-music-bedroom_23-2149849386.jpg",
              imageAlt: "Front view man making pop music in bedroom"
            }
          ]}
        />
      </div>

      <div id="faq-two-voice-accordion" data-webild-section="FaqTwoVoiceAccordion" data-webild-section-id="FaqTwoVoiceAccordion-1" data-section="faq-two-voice-accordion">
        <FaqTwoVoiceAccordion
          titleHeavy="Before You"
          titleSerif="License"
          description="Details on beat delivery, trackout stems, and exclusive licensing arrangements for artists."
          linkText="Contact studio"
          items={[
            {
              title: "How do I secure an exclusive beat?",
              description: "Send a message with your project details. Once terms are set and payment is finalized, the beat is removed from public rotation and all exclusive rights transfer to you."
            },
            {
              title: "What files come with my order?",
              description: "Standard leases starting at $150 include WAV and MP3 files. Exclusive purchases at $800 include full trackout stems for mixing."
            },
            {
              title: "How do I access the private artist folder?",
              description: "Reach out directly via the contact form with your artist link or label affiliation. Access codes are sent to qualified artists."
            }
          ]}
        />
      </div>

      <div id="contact-form-portrait" data-webild-section="ContactFormPortrait" data-webild-section-id="ContactFormPortrait-1" data-section="contact-form-portrait">
        <ContactFormPortrait
          heavyTitle="EXCLUSIVE"
          serifTitle="INQUIRIES"
          fields={[
            {
              name: "artistName",
              label: "Artist / Group Name",
              type: "text",
              required: true
            },
            {
              name: "email",
              label: "Email Address",
              type: "email",
              required: true
            },
            {
              name: "genre",
              label: "Genre Focus",
              type: "text"
            },
            {
              name: "message",
              label: "Project Brief & Details",
              type: "textarea",
              required: true
            }
          ]}
          submitText="Submit Brief"
          successText="Thank you. We will review your brief within 24 hours."
        />
      </div>
    </>
  );
}
