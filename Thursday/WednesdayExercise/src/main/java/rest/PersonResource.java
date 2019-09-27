package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import dto.PersonDTO;
import entities.Person;
import exceptions.PersonNotFoundException;
import utils.EMF_Creator;
import facades.PersonFacade;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

//Todo Remove or change relevant parts before ACTUAL use
@Path("person")
public class PersonResource {

    private static final EntityManagerFactory EMF = EMF_Creator.createEntityManagerFactory(EMF_Creator.DbSelector.DEV, EMF_Creator.Strategy.CREATE);
    private static final PersonFacade FACADE = PersonFacade.getFacade(EMF);
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String demo() {
        return "{\"msg\":\"Hello World\"}";
    }

    @GET
    @Path("/{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public String getPerson(@PathParam("id") long id) throws Throwable {

            Person person = FACADE.getPerson(id);
            PersonDTO personDTO = new PersonDTO(person);
            return GSON.toJson(personDTO);

    }

    @GET
    @Path("/all")
    @Produces({MediaType.APPLICATION_JSON})
    public String getAllPersons() throws Throwable {

        List<Person> persons = FACADE.getAllPersons();
        List<PersonDTO> personDTOs = new ArrayList();

        for (Person person : persons) {

            personDTOs.add(new PersonDTO(person));
        }

        return GSON.toJson(personDTOs);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addPerson(String personAsJson) throws Throwable {

        Person person = GSON.fromJson(personAsJson, Person.class);
        Person addedPerson = FACADE.addPerson(person.getFirstname(), person.getLastname(), person.getPhone());
        PersonDTO personDTO = new PersonDTO(addedPerson);

        return GSON.toJson(personDTO);

    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String editPerson(String personAsJson, @PathParam("id") long id) throws Throwable {
        try {
            Person oldPerson = FACADE.getPerson(id);
            Person newPerson = GSON.fromJson(personAsJson, Person.class);

            oldPerson.setFirstname(newPerson.getFirstname());
            oldPerson.setLastname(newPerson.getLastname());
            oldPerson.setPhone(newPerson.getPhone());

            Person person = FACADE.editPerson(oldPerson);
            PersonDTO personDTO = new PersonDTO(person);

            return GSON.toJson(personDTO);

        } catch (PersonNotFoundException ex) {

            throw new PersonNotFoundException("Could not edit, provided id does not exist");
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public String deletePerson(@PathParam("id") int id) throws Throwable {
        try {
            Person person = FACADE.getPerson(id);

            FACADE.deletePerson(id);

            PersonDTO personDTO = new PersonDTO(person);
            return GSON.toJson(personDTO);

        } catch (PersonNotFoundException ex) {

            throw new PersonNotFoundException("Could not delete, provided id does not exist");
        }

    }

}
