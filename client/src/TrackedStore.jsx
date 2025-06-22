import './TrackedStore.css';

export default function TrackedStore({ store }) {


    return(
        <div className="tracked-store-card">
            <div>
                <figure>
                    <img src={store.url}></img>
                </figure>
            </div>
            <div>
                <p>{store.name}</p>
            </div>

        </div>
    )
}