import Vue from 'vue';
import { Action } from '@/utils/decorators';
import { AUTH_NAMESPACE } from '@/store/modules';
import { SET_IS_AUTHENTICATED } from '@/store/constants/auth-constants';

/**
 * A vue helper class with methods to handle managing authentication.
 */
class VueAuthHelper extends Vue {
  @Action(SET_IS_AUTHENTICATED, AUTH_NAMESPACE) authenticateUser!: Function;

  /**
   * This will set the user as unauthenticated in store state as well as removing the auth token cookie created after
   * authenticating and then rerouting the user back to the home page.
   */
  unAuthenticateUser() {
    this.authenticateUser(false);
    this.$cookies.remove('token');
    this.$router.push('/');
  }
}

export default VueAuthHelper;
