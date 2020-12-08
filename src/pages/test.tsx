import { AdminWrapper } from "../components/AdminWrapper";
import { Testemonial } from "../components/Home/IntroSection/Testemonial";


export default AdminWrapper(() => {
    
    const testemonials = [ 
        {
            companyName: "Oslo Bedrift AS", 
            quote:"Krest har vaert spennende for oss! Vi har kommet i kontakt med kundene paa en maate v iikke hadde greid uten",
            personName:"Kari Normann", 
            logoURL:"https://krets.app/logo.svg"
        }, 
        {
            companyName:"Lillehammer Bedrift AS",
            quote:"Krets har gitt oss en spennende, ny måte å hente inn tilbakemeldigner fra våre kunder",
            personName:"Ola Normann, daglig leder",
            logoURL:"https://www.festningen-tannklinikk.no/media/logo_postive.svg",
        }
    ]
    
    return <>
        {testemonials.map(testemonial => <Testemonial 
            key={testemonial.companyName}
            {...testemonial}
        />)}
    </>
})