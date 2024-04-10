import { FirebaseApp, initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    Firestore,
    DocumentData,
    QueryConstraint,
    WhereFilterOp,
    addDoc,
    CollectionReference,
    doc,
    setDoc,
} from "firebase/firestore";

class DB {
    app: FirebaseApp;
    firestore: Firestore;

    constructor(projectId: string) {
        this.app = this.initializeApp(projectId);
        this.firestore = getFirestore(this.app);
    }

    initializeApp(projectId: string): FirebaseApp {
        return initializeApp({ projectId: projectId });
    }

    collection(path: string) {
        return new Collection(this, path);
    }
}

class Collection {
    private db: DB;
    private ref: CollectionReference;
    private queryConstraints: QueryConstraint[] = [];

    constructor(db: DB, path: string) {
        this.db = db;
        this.ref = collection(this.db.firestore, path);
    }

    where(field: string, operator: WhereFilterOp, value: any) {
        this.queryConstraints.push(where(field, operator, value));
        return this;
    }

    async get(): Promise<DocumentData[]> {
        const qu = query(this.ref, ...this.queryConstraints);
        const snapshot = await getDocs(qu);

        this.queryConstraints = [];

        return snapshot.docs.map((doc) => doc.data());
    }

    async add(data: DocumentData) {
        console.log("ASDASD111");
        await addDoc(this.ref, data);
    }

    async update(path: string, data: DocumentData) {
        const docRef = doc(this.ref, path);
        await setDoc(docRef, data);
    }
}

export default new DB("bumbleplane");
