import { useEffect, useState } from "react";
import { Container, Input, InputGroup, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getTagById, editTag } from "../../Managers/TagManager";

export const EditTag = () => {
    const [tag, setTags] = useState({
        name: ""
    });
    const navigate = useNavigate();
    const { id} = useParams()
    useEffect(() => {
        getTagById(id)
            .then((data) => {
                setTags(data)
            })
        }, [id])
    const handleSubmit = (e) => {
        return editTag(tag).then(() => navigate("/tags"));
    };
    return (
        <Container>
            <InputGroup>
                <Input
                    placeholder='Name'
                    value={tag.name}
                    onChange={(e) => {
                        const copy = { ...tag };
                        copy.name = e.target.value;
                        setTags(copy);
                    }}
                />
                <Button color='primary' onClick={(e) => handleSubmit(e)}>Save</Button>
            </InputGroup>
        </Container>
    );
};