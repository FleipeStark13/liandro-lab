import { app } from '@/services/firebase';
import { addDoc, collection, doc, DocumentData, getDoc, getDocs, getFirestore, query, setDoc, Timestamp, updateDoc, where } from 'firebase/firestore';
import ValidatePassword from './validatePassword';
import { IComment } from '@/app/components/AddNewComment';

const db = getFirestore(app);

export default async function checkUser(email: string, password: string) {
    try {


        const ref = collection(db, 'users');
        const q = query(ref, where('email', '==', email));

        const snapshot = await getDocs(q);

        if (snapshot.empty) {
            return false;
        } else {

            const hashPassword = snapshot.docs[0].get('password');


            if (!hashPassword) {
                return false;
            }

            const validate = await ValidatePassword(password, hashPassword);


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
    comments?: Array<string>;
}

export async function MakePost(data: IPost) {
    try {
        if (!data) {
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
            const data:IPost = snapshot.docs[0].data() as IPost
            return data;
        }
    } catch (err) {
        console.error(`Can't get post!`)
        return false;
    }
}


export async function AddComment(slug: string, data: IComment) {
    try {
        if (!slug) return false;

        const ref = collection(db, 'posts');
        const q = query(ref, where('slug', '==', slug));
        const snap = await getDocs(q);

        if (snap.docs.length > 0) {

            const doc_id = snap.docs[0].id;

            const comment_add_ref = collection(db, 'posts', doc_id, 'comments');

            try {
                await addDoc(comment_add_ref, data)
                return true;
            } catch (e) {
                console.error(`Cant add a new comment! ${e}`);
                return false;
            }

        }

    } catch (err) {
        console.error(err);
    }
}

export async function GetComments(slug: string) {
    try {
        if (!slug) return false;

        const ref = collection(db, 'posts');
        const q = query(ref, where('slug', '==', slug));
        const snap = await getDocs(q);

        if (snap.docs.length > 0) {
            const doc_id = snap.docs[0].id;
            const comment_ref = collection(db, 'posts/' + doc_id + '/comments');
            const comment_snap = await getDocs(comment_ref);

            if (comment_snap.docs.length === 0) return false;

            const comments: DocumentData[] = [];

            comment_snap.docs.map((comment) => {
                comments.push(comment.data());
            })

            if (comments.length > 0) {
                console.log(`Retornando coments`)
                return comments
            }
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function updateViews(slug: string) {
    try {
        if (!slug) return false;

        const ref = collection(db, 'posts');
        const q = query(ref, where('slug', '==', slug));
        const snap = await getDocs(q);

        if (snap.docs.length > 0) {
            const doc_id = snap.docs[0].id;
            const updateCount = doc(db, 'posts', doc_id);
            
            try {
                const newValue = snap.docs[0].data()?.viewCount + 1;
                await updateDoc(updateCount, {
                    viewCount: newValue
                })
                return true;
            } catch (err) {
                console.error(`Can't update views!`);
                return false
            }
        } else {
            return false;
        }

    } catch (err) {
        console.error(err);
        return false;
    }
}