import '../styles/TrackedStore.css';

export default function TrackedStore({ store }) {


    return(
        <div className="tracked-store-card">
            <div>
                <figure>
                    <img src={store.company_logo_url}></img>
                </figure>
            </div>
            <div>
                <p>{store.company_name}</p>
            </div>

        </div>
    )
}