import Sidebar from "@/components/Sidebar";
//import { generateUserId } from "@/lib/utils";
import Gemini from "@/components/Gemini";
import ModelsDialog from "@/components/ModelsDialog";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<UserType | null>(null);
  // const effectRan = useRef(false);

  // useEffect(() => {
  //   if (effectRan.current) return; // Prevent second execution

  //   const fetchChatsAndUser = async () => {
  //     const guestID = localStorage.getItem("guestID");
  //     if (guestID) {
  //       const existingUser = await getUserByClerkID(guestID);
  //       setUser(existingUser);
  //     } else {
  //       let newGuestClerkID = generateUserId();
  //       let existingUser = await getUserByClerkID(newGuestClerkID);
  //       while (existingUser) {
  //         newGuestClerkID = generateUserId();
  //         existingUser = await getUserByClerkID(newGuestClerkID);
  //       }
  //       const newUser = {
  //         clerkID: newGuestClerkID,
  //         email: `guest${newGuestClerkID}@gmail.com`,
  //         username: `guest${newGuestClerkID}`,
  //         firstName: "Guest",
  //         lastName: "Guest",
  //       };
  //       const user = await createUser(newUser);
  //       if (user) {
  //         setUser(user);
  //         localStorage.setItem("guestID", newGuestClerkID);
  //       }
  //     }
  //   };

  //   fetchChatsAndUser();
  //   effectRan.current = true; // Mark effect as executed
  // }, []);

  return (
    <Gemini>
      <main className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* <UserContext.Provider value={user}> */}
        <Sidebar />
        <div className="mt-3 mb-[10px] ml-[10px]">
          <ModelsDialog />
        </div>
        {children}
        {/* </UserContext.Provider> */}
      </main>
    </Gemini>
  );
};

export default Layout;
