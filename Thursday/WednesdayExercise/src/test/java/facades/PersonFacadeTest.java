package facades;

import entities.Person;
import exceptions.PersonNotFoundException;
import java.util.List;
import utils.EMF_Creator;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import utils.Settings;
import utils.EMF_Creator.DbSelector;
import utils.EMF_Creator.Strategy;

//Uncomment the line below, to temporarily disable this test
//@Disabled
public class PersonFacadeTest {

    private static EntityManagerFactory emf;
    private static PersonFacade facade;

    private Person p1;
    private Person p2;
    private Person p3;
    private Person p4;

    public PersonFacadeTest() {
    }

    @BeforeAll
    public static void setUpClass() {
        emf = EMF_Creator.createEntityManagerFactory(DbSelector.TEST, Strategy.DROP_AND_CREATE);
        facade = PersonFacade.getFacade(emf);
    }

    @AfterAll
    public static void tearDownClass() {

    }

    // Setup the DataBase in a known state BEFORE EACH TEST
    //TODO -- Make sure to change the script below to use YOUR OWN entity class
    @BeforeEach
    public void setUp() {
        EntityManager em = emf.createEntityManager();

        p1 = new Person("Laura", "Saxtrup", "20141614");
        p2 = new Person("Amanda", "Hansen", "42441486");
        p3 = new Person("Jonas", "Haslund", "21534532");
        p4 = new Person("Amalie", "Landt", "20856221");

        try {
            em.getTransaction().begin();
            em.createNamedQuery("Person.deleteAllRows").executeUpdate();
            em.persist(p1);
            em.persist(p2);
            em.persist(p3);
            em.persist(p4);
            em.getTransaction().commit();

        } finally {
            em.close();
        }
    }

    /**
     * Test of getPerson method, of class PersonFacade.
     *
     * @throws exceptions.PersonNotFoundException
     */
    @Test
    public void testGetPerson() throws PersonNotFoundException {

        Person person = facade.getPerson(p1.getId());
        assertEquals(person.getFirstname(), "Laura");
        assertEquals(person.getPhone(), "20141614");
    }

    @Test
    public void testGetPersonError() throws PersonNotFoundException {
        try {
            facade.getPerson(140);
            fail();
        } catch (PersonNotFoundException ex) {

            assertEquals(ex.getMessage(), "No person with provided id found");

        }
    }

    /**
     * Test of getAllPersons method, of class PersonFacade.
     */
    @Test
    public void testGetAllPersons() {
        List<Person> persons = facade.getAllPersons();
        assertEquals(persons.size(), 4);
    }

    /**
     * Test of addPerson method, of class PersonFacade.
     * @throws java.lang.Throwable
     */
    @Test
    public void testAddPerson() throws Throwable {

        int personsbefore = facade.getAllPersons().size();
        facade.addPerson("Benjamin", "Kongshaug", "11223344");
        int personsafter = facade.getAllPersons().size();

        assertTrue(personsbefore < personsafter);
    }

    /**
     * Test of editPerson method, of class PersonFacade.
     *
     * @throws exceptions.PersonNotFoundException
     */
    @Test
    public void testEditPerson() throws PersonNotFoundException, Throwable {

        Person person = facade.getPerson(p1.getId());
        person.setFirstname("Charlotte");
        person.setPhone("11223344");
        facade.editPerson(person);

        Person edited = facade.getPerson(p1.getId());
        assertEquals(edited.getFirstname(), "Charlotte");
        assertEquals(edited.getPhone(), "11223344");

    }
    
    @Test
    public void testEditPersonError() throws PersonNotFoundException, Throwable {
        try {
            Person person = null;
            facade.editPerson(person);
            fail();
        } catch (PersonNotFoundException ex) {
            assertEquals(ex.getMessage(), "Could not edit, provided id does not exist");
        }
    }

    /**
     * Test of editPerson method, of class PersonFacade.
     *
     * @throws exceptions.PersonNotFoundException
     */
    @Test
    public void testDeletePerson() throws PersonNotFoundException {

        int personsbefore = facade.getAllPersons().size();
        facade.deletePerson(p4.getId());
        int personsafter = facade.getAllPersons().size();

        assertTrue(personsbefore > personsafter);

    }
    
    @Test
    public void testDeletePersonError() throws PersonNotFoundException {
        try {
            facade.deletePerson(140);
            fail();
        } catch (PersonNotFoundException ex) {
            assertEquals(ex.getMessage(), "Could not delete, provided id does not exist");
        }
    }

}
