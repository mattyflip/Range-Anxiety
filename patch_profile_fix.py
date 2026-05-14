with open("src/pages/Profile.tsx", "r") as f:
    content = f.read()

# Replace block 2
old2 = """if (user) {
          getDoc(doc(db, "users", snap.docs[0].id, "followers", user.uid)).then(d => setIsFollowing(d.exists()));
        }
        getCountFromServer(collection(db, "users", snap.docs[0].id, "followers")).then(c => setFollowerCount(c.data().count));
        getCountFromServer(collection(db, "users", snap.docs[0].id, "following")).then(c => setFollowingCount(c.data().count));
            if (postsUnsub) postsUnsub();
            postsUnsub = fetchUserPosts(origSnap.docs[0].id);"""

new2 = """if (user) {
          getDoc(doc(db, "users", origSnap.docs[0].id, "followers", user.uid)).then(d => setIsFollowing(d.exists()));
        }
        getCountFromServer(collection(db, "users", origSnap.docs[0].id, "followers")).then(c => setFollowerCount(c.data().count));
        getCountFromServer(collection(db, "users", origSnap.docs[0].id, "following")).then(c => setFollowingCount(c.data().count));
            if (postsUnsub) postsUnsub();
            postsUnsub = fetchUserPosts(origSnap.docs[0].id);"""

content = content.replace(old2, new2)

# Replace block 3
old3 = """if (user) {
          getDoc(doc(db, "users", snap.docs[0].id, "followers", user.uid)).then(d => setIsFollowing(d.exists()));
        }
        getCountFromServer(collection(db, "users", snap.docs[0].id, "followers")).then(c => setFollowerCount(c.data().count));
        getCountFromServer(collection(db, "users", snap.docs[0].id, "following")).then(c => setFollowingCount(c.data().count));
                if (postsUnsub) postsUnsub();
                postsUnsub = fetchUserPosts(uSnap.id);"""

new3 = """if (user) {
          getDoc(doc(db, "users", uSnap.id, "followers", user.uid)).then(d => setIsFollowing(d.exists()));
        }
        getCountFromServer(collection(db, "users", uSnap.id, "followers")).then(c => setFollowerCount(c.data().count));
        getCountFromServer(collection(db, "users", uSnap.id, "following")).then(c => setFollowingCount(c.data().count));
                if (postsUnsub) postsUnsub();
                postsUnsub = fetchUserPosts(uSnap.id);"""

content = content.replace(old3, new3)

with open("src/pages/Profile.tsx", "w") as f:
    f.write(content)
