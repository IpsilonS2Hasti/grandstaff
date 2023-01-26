import { Grid } from "@mui/material";
import ProfileListing from "./ProfileListing";

const ProfileListings = ({ listings }) => {
    return ( 
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px'}}>
                {
                    listings.map(listing => (
                            <ProfileListing {...listing} />
                        ))
                }
            </div>
     );
}
 
export default ProfileListings;