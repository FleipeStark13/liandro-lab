import { app } from '@/services/firebase';
import { collection, doc, getDocs, getFirestore, query, setDoc, Timestamp, where } from 'firebase/firestore';
import ValidatePassword from './validatePassword';

const db = getFirestore(app);

export default async function checkUser(email: string, password: string) {
    try {

        console.log(`Database: ${email}, ${password}`)

        const ref = collection(db, 'users');
        const q = query(ref, where('email', '==', email));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            console.log(`Snapshot empty!`)
            return false;
        } else {
            console.log(`Passou da snapshot`)

            const hashPassword = snapshot.docs[0].get('password');

            console.log(`Hashpass: ${hashPassword}`)

            if (!hashPassword) {
                return false;
            }

            const validate = await ValidatePassword(password, hashPassword);

            console.log(`validate: ${validate}`)

            if (validate) {
                return true;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.error(`Can't get user in db: ${error}`);
        return false;
    }
}

export interface IPost {
    title: string;
    slug: string;
    summary: string;
    content: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    viewCount: number;
}

export async function MakePost(data: IPost) {
    try {
        if (!data) {
            console.log("Can't get a empty data.");
            return false;
        }
    
        const ref = collection(db, 'posts');
        try {
            await setDoc(doc(ref), data)
            return true;
        } catch (err) {
            return false;
        }
    
    
    } catch (err) {
        console.error(`Can't make the post: ${err}`);
        return false;
    }
}

export async function GetPosts() {
    try {
        const ref = collection(db, 'posts');
        try {
            const docs = (await getDocs(ref)).docs.map(doc => ({ ...doc.data() }));
            console.log(docs);
            return docs;
        } catch (err) {
            return false;
        }
    } catch (err) {
        return false;
    }
}

export async function GetPostBySlug(slug: string) {
    try {
        const ref = collection(db, 'posts');
        const q = query(ref, where('slug', '==', slug));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return false
        } else {
            console.log(snapshot.docs[0])

            const data:IPost = snapshot.docs[0].data() as IPost

            return data;
        }
    } catch (err) {
        console.error(`Can't get post!`)
        return false;
    }
}