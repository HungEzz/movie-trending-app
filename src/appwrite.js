import { Client, TablesDB, ID, Query } from "appwrite";

const APPWRITE_PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const APPWRITE_DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const APPWRITE_TABLE_ID = import.meta.env.VITE_APPWRITE_TABLE_ID;
const APPWRITE_ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT;

const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT) // endpoint
    .setProject(APPWRITE_PROJECT_ID);

const tablesDB = new TablesDB(client);

export const updateMovieCount = async (searchTerm, movie) => {
    // 1. Use appwrite sdk to check if searchTerm  is exist in the database;
    if (!searchTerm || !movie) return;
    try {
        const promise = await tablesDB.listRows({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_TABLE_ID,
            queries: [
                Query.equal('searchTerm', searchTerm)
            ]
        });

        const existingRow = promise.rows[0];
        // 2. If it does, update count
        if (existingRow) {
            await tablesDB.updateRow({
                databaseId: APPWRITE_DATABASE_ID,
                tableId: APPWRITE_TABLE_ID,
                rowId: existingRow.$id,
                data: { count: existingRow.count + 1 },
            });
        } else {
            // 2. else create a new document with the search term and set count  = 1;
            await tablesDB.createRow({
                databaseId: APPWRITE_DATABASE_ID,
                tableId: APPWRITE_TABLE_ID,
                rowId: ID.unique(),
                data: {
                    searchTerm: searchTerm,
                    count: 1,
                    movie_id: movie.id,
                    title: movie.title,
                    poster_url: `https://media.themoviedb.org/t/p/w500/${movie.poster_path}`
                }
            });
        }
    } catch (error) {
        console.log(error);
    }

}

export const loadingTrendingMovies = async() =>{
    try {
         const data = await tablesDB.listRows({
            databaseId: APPWRITE_DATABASE_ID,
            tableId: APPWRITE_TABLE_ID,
            queries: [
                Query.limit(5),
                Query.orderDesc("count")
            ]
        });
        return data.rows;
    } catch (error) {
        console.log(error);
    }
}