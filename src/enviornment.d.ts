declare global {
    namespace NodeJS {
      interface ProcessEnv {
        CLIENT_ID: string;
        GUILD_ID: string;
        BOT_TOKEN: string;
		PEXELS_API: string;
      }
    }
  }
  
  export {}
