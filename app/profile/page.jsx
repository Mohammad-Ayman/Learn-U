import PersonalInfo from "@/Components/ProfilePage/PersonalInfo/PersonalInfo";
import TotalStatistics from "@/Components/ProfilePage/TotalStatistics/TotalStatistics";
import Achievements from "@/Components/ProfilePage/Achievements/Achievements";
import FriendSuggestions from "@/Components/ProfilePage/FriendSuggestion/friend-suggestion";
import Friends from "@/Components/ProfilePage/Friends/friends";
import Button from "@/Components/ProfilePage/Buttons/buttons";
import styles from "./profilePage.module.css";

const Profile = () => {
  return (
    <main className={styles["profile-container"]}>
      <div className={styles["first"]}>
        <PersonalInfo />
        <TotalStatistics />
        <Achievements />
      </div>
      <div className={styles["second"]}>
        <FriendSuggestions />
        <Friends />
        <Button />
      </div>
    </main>
  );
};

export default Profile;
