import { useContext } from "react";
// import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function HomePage() {

  const { currentUser } = useContext(AuthContext)

  return (
    <div>
      <main className="flex-1">

        {/* Banner */}
        <section className="w-full">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Reliable Pet Care, Anytime
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-l dark:text-gray-400">
                    PetCareHub connects you with trusted pet caretakers who provide secure, reliable pet care services.
                    Enjoy peace of mind knowing your furry friends are in good hands.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/list">
                    <button className="bg-[#FF8326] text-white px-4 py-2 rounded-md">
                      Find a Care Request
                    </button>
                  </Link>
                  <Link to="/add">
                    <button>
                      Post a Care Request
                    </button>
                  </Link>
                </div>
              </div>
              <img
                src="banner.jpg"
                alt="Hero"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="w-full py-6 md:py-12 lg:py-16 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Easy-to-Use Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Pet Care with PetCareHub</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  PetCareHub offers a seamless platform for pet owners to connect with trusted caretakers and manage all
                  their pet care needs in one place.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="img1.jpg"
                alt="Image"
                className="mx-auto aspect-auto overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-10">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Post Care Requests</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Easily create and post care requests for your pets, specifying your needs and preferences.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Find Trusted Caretakers</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Browse and connect with a network of vetted and reliable pet caretakers in your area.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Secure Bookings</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Securely book and manage pet care services through our platform, with transparent pricing and
                        reviews.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        {/* <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Trust Your Pets with PetCareHub</h2>
                        <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                            Our platform connects you with a network of vetted and reliable pet caretakers, ensuring your furry
                            friends receive the best possible care.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 min-[400px]:flex-row lg:justify-end">
                        <button>
                            Contact Us
                        </button>
                        <button>
                            Post a Care Request
                        </button>
                    </div>
                </div>
            </section> */}

        {/* What Our Customers Say */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Hear from pet owners who have trusted PetCareHub to provide exceptional care for their furry friends.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <blockquote className="text-lg font-semibold leading-snug">
                  &ldquo;The customer service I received was exceptional. The support team went above and beyond to address
                  my concerns.&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold">Jules Winnfield</div>
                  <div className="text-sm text-muted-foreground">CEO, Acme Inc</div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <blockquote className="text-lg font-semibold leading-snug">
                  &ldquo;I recently purchased the SparkleShine Home Cleaning Robot, and it has been a game-changer in my
                  life. I used to spend hours every weekend cleaning my house, but now I can simply turn on this little
                  robot and let it do the work.&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">Homeowner, Sunny Estates</div>
                </div>
              </div>
              <div className="flex flex-col gap-4 rounded-lg border bg-background p-6 shadow-sm transition-shadow hover:shadow-md">
                <blockquote className="text-lg font-semibold leading-snug">
                  &ldquo;The battery life is impressive, lasting me for long-haul flights without any issues. They are
                  comfortable to wear for extended periods, and I appreciate the sleek design.&rdquo;
                </blockquote>
                <div>
                  <div className="font-semibold">Alex Smith</div>
                  <div className="text-sm text-muted-foreground">Frequent Flyer, Globetrotter Airlines</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
