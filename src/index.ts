import getProject from "./shared/api/APIRoot";
import router from "./app/routing";

router.navigate(window.location.hash);

// it's just dev test code, kill it later
getProject().then(console.log).catch(console.error);

console.log(
  "it's just test dotenv process.env.CTP_PROJECT_KEY:",
  process.env.CTP_PROJECT_KEY,
);
