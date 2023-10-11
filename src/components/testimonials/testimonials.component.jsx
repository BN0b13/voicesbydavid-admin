import {
    MainContainer,
    TestimonialsTable,
    TestimonialsTableData,
    TestimonialsTableHeader,
    TestimonialsTableHead,
    TestimonialsTableBody,
    TestimonialsTableRow
} from './testimonials.styles';

const Testimonials = ({testimonials }) => {

    return (
        <MainContainer>
            <TestimonialsTable>
                <TestimonialsTableHeader>
                    <TestimonialsTableRow>
                        <TestimonialsTableHead>Name</TestimonialsTableHead>
                        <TestimonialsTableHead>Testimonial</TestimonialsTableHead>
                    </TestimonialsTableRow>
                </TestimonialsTableHeader>
                <TestimonialsTableBody>
                    {testimonials.map((item, iteration) => (
                        <TestimonialsTableRow key={iteration} onClick={() => window.location = `/testimonials/${item.id}`}>
                            <TestimonialsTableData>{item.firstName} {item.lastName}</TestimonialsTableData>
                            <TestimonialsTableData>{item.testimonial}</TestimonialsTableData>
                        </TestimonialsTableRow>
                    ))}
                </TestimonialsTableBody>
            </TestimonialsTable>
        </MainContainer>
    )
}

export default Testimonials;