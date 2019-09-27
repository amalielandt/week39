/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rest;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.MediaType;

/**
 * REST Web Service
 *
 * @author sofieamalielandt
 */
@Path("person")
public class PersonResource {

    public class Person {

        public String name;

        public Person(String name) {
            this.name = name;
        }

    }
    
    public static List<Person> persons = new ArrayList();
    private static final Gson GSON = new GsonBuilder().setPrettyPrinting().create();
    
    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String demo() {
        return "{\"msg\":\"Hello World\"}";
    }

    @GET
    @Path("/{name}")
    @Produces({MediaType.APPLICATION_JSON})
    public String getPerson(@PathParam("name") String name) {

        Person person = null;

        for (Person p : persons) {
            if (p.name.equals(name)) {
                person = p;
            }
        }
        return GSON.toJson(person);
    }

    @GET
    @Path("/all")
    @Produces({MediaType.APPLICATION_JSON})
    public String getAllPersons() {

        return GSON.toJson(persons);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String addPerson(String personAsJson) {

        Person person = GSON.fromJson(personAsJson, Person.class);
        persons.add(person);

        return GSON.toJson(persons.get(persons.size() - 1));

    }

    @PUT
    @Path("/{name}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public String editPerson(String personAsJson, @PathParam("name") String name) {

        Person person = null;
        Person newPerson = GSON.fromJson(personAsJson, Person.class);

        for (Person p : persons) {
            if (p.name.equals(name)) {
                person = p;
            }
        }

        if (person != null) {
            person.name = newPerson.name;
        }

        return GSON.toJson(person);
    }

    @DELETE
    @Path("/{name}")
    @Produces(MediaType.APPLICATION_JSON)
    public String deletePerson(@PathParam("name") String name) {

        Person person = null;

        for (Person p : persons) {
            if (p.name.equals(name)) {
                person = p;
            }
        }

        if (person != null) {
            persons.remove(person);
        }

        return GSON.toJson(person);
    }
}
