import { Grid } from "@mui/material";
import BandListing from "./BandListing";

const BandListings = ({ listings }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px' }}>
            {
                listings.map(listing => (
                    <BandListing {...listing} />
                ))
            }
            {
                [1, 2, 3, 4].map(() => <div/>)
            }
        </div>
    );
}

export default BandListings;