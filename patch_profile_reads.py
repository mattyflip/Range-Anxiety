import re

with open("src/pages/Profile.tsx", "r") as f:
    content = f.read()

# Add getDocs, collection, deleteDoc to imports if not there (they likely are, but let's be careful)
if "deleteDoc" not in content:
    content = content.replace("updateDoc,", "updateDoc, deleteDoc,")

# Add state for counts
content = content.replace(
    "const [isFollowing, setIsFollowing] = useState(false);",
    "const [isFollowing, setIsFollowing] = useState(false);\n  const [followerCount, setFollowerCount] = useState(0);\n  const [followingCount, setFollowingCount] = useState(0);"
)

# Replace data.followers logic in snapshot
old_followers_logic = """if (user && data.followers) setIsFollowing(data.followers.includes(user.uid));"""
new_followers_logic = """if (user) {
          getDoc(doc(db, "users", snap.docs[0].id, "followers", user.uid)).then(d => setIsFollowing(d.exists()));
        }
        getCountFromServer(collection(db, "users", snap.docs[0].id, "followers")).then(c => setFollowerCount(c.data().count));
        getCountFromServer(collection(db, "users", snap.docs[0].id, "following")).then(c => setFollowingCount(c.data().count));"""

content = content.replace(old_followers_logic, new_followers_logic)

# Wait, the same logic is there 3 times in Profile.tsx! (Target user, normal view, etc)
# Let's just do a regex replace for all occurrences of that line.

# Replace the render logic
content = content.replace("{profileData.followers?.length || 0}", "{followerCount}")
content = content.replace("{profileData.following?.length || 0}", "{followingCount}")

# Add getCountFromServer to imports
content = content.replace("getDoc,", "getDoc, getCountFromServer,")
content = content.replace("import { deleteDoc } from 'firebase/firestore'", "import { deleteDoc, setDoc } from 'firebase/firestore'")

if "setDoc" not in content:
    content = content.replace("doc,", "doc, setDoc,")

with open("src/pages/Profile.tsx", "w") as f:
    f.write(content)
