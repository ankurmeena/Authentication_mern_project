import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://www.bing.com/images/search?view=detailV2&ccid=JsT06K1C&id=E9A45CA64F9637C3256B00E132CD478DE1E77080&thid=OIP.JsT06K1CWr_50_8-sC8UwQHaHa&mediaurl=https%3a%2f%2flaiacc.com%2fwp-content%2fuploads%2f2019%2f03%2fblank-profile-picture-973460_1280-600x600.png&exph=600&expw=600&q=Blank+Profile&simid=608040170077374525&FORM=IRPRST&ck=0D15D7B0057A41110EACAB3C0B3A7093&selectedIndex=23&itb=0&ajaxhist=0&ajaxserp=0",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
