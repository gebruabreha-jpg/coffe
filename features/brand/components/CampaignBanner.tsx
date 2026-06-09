export default function CampaignBanner() {
  return (
    <section className="relative py-24 px-6 text-center bg-black text-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold leading-tight">
          Born in Ethiopia — the birthplace of coffee
        </h1>

        <p className="mt-6 text-lg text-gray-200 leading-relaxed">
          We bring single-origin beans directly from farmers to you. <br />
          Pure taste. Honest sourcing. A direct connection to the world’s finest beans.
        </p>

        <div className="mt-8">
          <button className="bg-white text-black px-6 py-3 rounded-full font-medium">
            Shop Coffee
          </button>
        </div>
      </div>
    </section>
  );
}