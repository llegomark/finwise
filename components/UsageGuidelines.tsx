import Image from "next/image";
import markllego from "../public/markllego.jpg";

const UsageGuidelines: React.FC = () => {
  return (
    <div className="mx-auto max-w-xl rounded-lg bg-yellow-200 p-4 text-start text-slate-900 sm:text-lg lg:text-lg">
      <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
        Usage Guidelines
      </h2>
      <div className="mt-4">
        <p className="mb-4">
          Hey there, financial genius! Before you start telling us about your
          money woes, we have a few guidelines we need you to follow.
        </p>
        <p className="mb-4">
          First things first, please don&apos;t give us any juicy secrets like
          your Social Security number or your dog&apos;s favorite flavor of ice
          cream. We&apos;re flattered you trust us, but we&apos;re not that kind
          of platform.
        </p>
        <p className="mb-4">
          Secondly, while our AI-powered advice is pretty slick, it&apos;s still
          just advice. Please don&apos;t go quitting your day job just because
          we said so. Talk to a professional before making any big moves.
        </p>
        <p className="mb-4">
          Thirdly, we reserve the right to kick you off the platform if you
          start acting like a jerk. Just be cool, okay?
        </p>
        <p className="mb-4">
          Finally, by using our platform, you agree to these guidelines and our
          disclaimer. We&apos;re not responsible for any mistakes or bad
          decisions you make. Hey, at least we tried.
        </p>
        <p className="mb-4">
          Thanks for trusting us with your finances! Let&apos;s get to work and
          make that money work for you.
        </p>
      </div>
      <div className="mt-8">
        <h2 className="mb-2 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          The Code Crusader Who&apos;s Making Money Management Less Painful
        </h2>
        <div className="mt-4">
          <Image
            className="mx-auto mb-4 rounded-full"
            width={100}
            height={100}
            src="/markllego.jpg"
            alt="Mark Anthony Llego"
          />
          <p className="mb-4">
            Meet Mark Anthony Llego – the brilliant mind behind our AI-powered
            financial guidance platform. Don&apos;t let his name fool you,
            he&apos;s not a Roman emperor or a Shakespearean character –
            he&apos;s a software engineer with a knack for creating awesome apps
            that make life easier.
          </p>
          <p className="mb-4">
            Mark Anthony is the kind of guy who eats, sleeps, and breathes code.
            He once spent an entire weekend building an app that reminds him to
            take bathroom breaks (don&apos;t worry, he&apos;s working on a more
            sophisticated version). He&apos;s the kind of person who sees a
            problem and immediately thinks, `there&apos;s got to be a better way
            to do this,` and then spends months creating a solution that blows
            everyone&apos;s minds.
          </p>
          <p className="mb-4">
            So when he saw how confusing and complicated the world of personal
            finance was, he knew he had to do something. He locked himself in
            his basement for weeks, subsisting on ramen noodles and coffee,
            until he emerged with our AI-powered financial guidance platform.
            Thanks to his hard work and genius, you now have access to a
            platform that can help you take control of your finances and achieve
            your financial goals.
          </p>
          <p className="mb-4">
            So give it up for Mark Anthony Llego – the software engineer
            who&apos;s making personal finance fun (or at least, less painful).
          </p>
        </div>
      </div>
    </div>
  );
};
export default UsageGuidelines;
