import GithubThemeIcon from "@/components/auth/githubThemeIcon";
import LoginButton from "@/components/auth/loginButton";

const GitHubForm = () => {
  return (
    <div className="max-w-[420px] flex flex-col justify-center items-start text-start font-normal px-5 md:px-0 w-full">
      <h1 className="text-cloudBurst dark:text-white text-4xl">Sign In</h1>
      <h3 className="text-rockBlue dark:text-white text-sm mt-3">
        Choose your preferred sign in method
      </h3>
      <LoginButton title="Sign in with Github">
        <GithubThemeIcon />
      </LoginButton>
      {/* <div
            className="flex flex-col w-full mt-9"
        >
            <hr className="border-rockBlue dark:border-deepBlue border-t border-opacity-30" />
            <div className="text-center text-sm -mt-[0.6rem]">
                <span className="px-3 bg-white dark:bg-navy-900 text-rockBlue dark:text-white">Or</span>
            </div>
        </div>
        <LoginButton title="Sign in with Google">
            <GithubThemeIcon />
        </LoginButton>
        <LoginButton title="Sign in with Facebook">
            <GithubThemeIcon />
        </LoginButton>
        <LoginButton title="Sign in with Apple">
            <GithubThemeIcon />
        </LoginButton> */}
    </div>
  );
};

export default GitHubForm;
